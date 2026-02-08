import { useState, useRef, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition, EmptyState } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { carrierApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { formatDateTime } from '@/lib/utils';
import { OcrJobStatus, type OcrJob } from '@/types';

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  PENDING: {
    label: 'Pending',
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    color: 'text-yellow-400',
  },
  PROCESSING: {
    label: 'Processing',
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    color: 'text-blue-400',
  },
  COMPLETED: {
    label: 'Completed',
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    color: 'text-emerald-400',
  },
  FAILED: {
    label: 'Failed',
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    color: 'text-red-400',
  },
};

export default function OcrPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewJob, setPreviewJob] = useState<OcrJob | null>(null);

  // Track job IDs we've uploaded so we can poll them
  const [jobIds, setJobIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('portflow-ocr-jobs') || '[]');
    } catch {
      return [];
    }
  });

  const saveJobIds = useCallback((ids: string[]) => {
    setJobIds(ids);
    localStorage.setItem('portflow-ocr-jobs', JSON.stringify(ids));
  }, []);

  // Poll each job from backend to get real status
  const { data: jobs = [] } = useQuery({
    queryKey: ['ocr', 'jobs', jobIds],
    queryFn: async () => {
      if (!jobIds.length) return [];
      const results = await Promise.all(
        jobIds.map((id) => carrierApi.getOcrJob(id).catch(() => null)),
      );
      return results.filter(Boolean) as OcrJob[];
    },
    enabled: jobIds.length > 0,
    // Poll every 3s while any job is still processing
    refetchInterval: (query) => {
      const data = query.state.data as OcrJob[] | undefined;
      const hasPending = data?.some(
        (j) =>
          j.status === OcrJobStatus.PENDING ||
          j.status === OcrJobStatus.PROCESSING,
      );
      return hasPending ? 3000 : false;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => carrierApi.uploadBol(file),
    onSuccess: (result) => {
      const newIds = [result.id, ...jobIds];
      saveJobIds(newIds);
      queryClient.invalidateQueries({ queryKey: ['ocr', 'jobs'] });
      toast.success('Document uploaded — OCR processing started');
    },
    onError: () => toast.error('Upload failed'),
  });

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast.error('Only images and PDF files are supported');
      return;
    }
    uploadMutation.mutate(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">OCR — Bill of Lading</h1>
          <p className="text-sm text-muted-foreground">
            Upload a Bill of Lading image and auto-extract fields for booking
          </p>
        </div>

        {/* Upload Zone */}
        <Card>
          <CardContent className="p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed
                p-12 cursor-pointer transition-all duration-300
                ${
                  dragOver
                    ? 'border-cyan-400 bg-cyan-400/10 scale-[1.01]'
                    : 'border-border/60 hover:border-cyan-400/40 hover:bg-card/50'
                }
              `}
            >
              {uploadMutation.isPending ? (
                <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
              ) : (
                <motion.div
                  animate={
                    dragOver ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }
                  }
                >
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </motion.div>
              )}
              <div className="text-center">
                <p className="font-medium">
                  {uploadMutation.isPending
                    ? 'Uploading…'
                    : 'Drop file here or click to browse'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPEG, PNG, PDF — max 10 MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent OCR Jobs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {!jobs.length ? (
              <EmptyState
                title="No OCR jobs yet"
                description="Upload a document to get started"
                icon={<FileText className="h-8 w-8 text-muted-foreground" />}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job, i) => {
                    const st = (statusConfig[job.status as string] ??
                      statusConfig['PENDING'])!;
                    return (
                      <motion.tr
                        key={job.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-border/50"
                      >
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {job.originalFilename || job.id}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm ${st.color}`}
                          >
                            {st.icon} {st.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDateTime(job.createdAt)}
                        </TableCell>
                        <TableCell>
                          {job.status === 'COMPLETED' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setPreviewJob(job)}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          )}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={!!previewJob} onOpenChange={() => setPreviewJob(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Extracted Fields</DialogTitle>
            </DialogHeader>
            {previewJob?.extractedData && (
              <div className="space-y-3">
                {Object.entries(
                  previewJob.extractedData as Record<string, string>,
                ).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider w-36 shrink-0 pt-0.5">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
