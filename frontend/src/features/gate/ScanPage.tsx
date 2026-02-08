import { useState, useEffect, useRef, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode,
  Camera,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  ScanLine,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { gateApi, adminApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import { GateAccessResult, type GateScanResponse, type Gate } from '@/types';

export default function ScanPage() {
  const [qrToken, setQrToken] = useState('');
  const [selectedGateId, setSelectedGateId] = useState('');
  const [scanResult, setScanResult] = useState<GateScanResponse | null>(null);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrRef = useRef<any>(null);

  const { data: gates } = useQuery({
    queryKey: queryKeys.gates,
    queryFn: adminApi.getGates,
  });

  // Auto-select first gate
  useEffect(() => {
    if (gates && gates.length > 0 && !selectedGateId) {
      setSelectedGateId(gates[0]!.id);
    }
  }, [gates, selectedGateId]);

  const scanMutation = useMutation({
    mutationFn: gateApi.scan,
    onSuccess: (result) => {
      setScanResult(result);
      stopCamera();
    },
    onError: () => toast.error('Scan failed — please try again'),
  });

  const startCamera = useCallback(async () => {
    if (!scannerRef.current) return;
    setScanning(true);
    setScanResult(null);

    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const scanner = new Html5Qrcode('qr-reader');
      html5QrRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setQrToken(decodedText);
          scanner.stop().catch(() => {});
          setScanning(false);
          if (selectedGateId) {
            scanMutation.mutate({
              qrToken: decodedText,
              gateId: selectedGateId,
            });
          }
        },
        () => {}, // ignore errors
      );
    } catch (err) {
      console.error('Camera error:', err);
      toast.error('Could not access camera');
      setScanning(false);
    }
  }, [selectedGateId]);

  const stopCamera = useCallback(() => {
    html5QrRef.current?.stop?.().catch(() => {});
    html5QrRef.current = null;
    setScanning(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const handleManualScan = () => {
    if (!qrToken.trim() || !selectedGateId) {
      toast.error('Enter a QR token and select a gate');
      return;
    }
    scanMutation.mutate({ qrToken: qrToken.trim(), gateId: selectedGateId });
  };

  const reset = () => {
    setScanResult(null);
    setQrToken('');
  };

  const isAllowed = scanResult?.result === GateAccessResult.ALLOWED;

  return (
    <PageTransition>
      <div className="space-y-6 max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Gate Scanner</h1>
          <p className="text-sm text-muted-foreground">
            Scan booking QR codes to grant or deny access
          </p>
        </div>

        {/* Gate Select */}
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Select Gate</Label>
            <select
              value={selectedGateId}
              onChange={(e) => setSelectedGateId(e.target.value)}
              className="flex h-10 w-full items-center rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select a gate...</option>
              {gates?.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} {g.terminal?.name ? `(${g.terminal.name})` : ''}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Result Screen */}
        <AnimatePresence mode="wait">
          {scanResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <Card
                className={`border-2 ${
                  isAllowed
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-red-500/50 bg-red-500/5'
                }`}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
                      isAllowed ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    {isAllowed ? (
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    ) : (
                      <XCircle className="h-10 w-10 text-red-400" />
                    )}
                  </motion.div>

                  <div>
                    <h2
                      className={`text-3xl font-bold ${
                        isAllowed ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {isAllowed ? 'ACCESS ALLOWED' : 'ACCESS DENIED'}
                    </h2>
                    {scanResult.reason && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {scanResult.reason}
                      </p>
                    )}
                  </div>

                  {scanResult.booking && (
                    <div className="text-left glass rounded-lg p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Terminal</span>
                        <span className="font-medium">
                          {scanResult.booking.terminal?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Container</span>
                        <span className="font-mono">
                          {scanResult.booking.container?.containerNumber || '—'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Truck</span>
                        <span className="font-mono">
                          {scanResult.booking.truck?.plate || '—'}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="mt-4" onClick={reset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Scan Another
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="scanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Camera Scanner */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div
                    id="qr-reader"
                    ref={scannerRef}
                    className="rounded-lg overflow-hidden bg-black/50 min-h-[280px] flex items-center justify-center"
                  >
                    {!scanning && (
                      <div className="text-center p-8 space-y-3">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Click below to start camera
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!scanning ? (
                      <Button
                        className="flex-1"
                        variant="glow"
                        onClick={startCamera}
                        disabled={!selectedGateId}
                      >
                        <ScanLine className="h-4 w-4 mr-2" />
                        Start Camera
                      </Button>
                    ) : (
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={stopCamera}
                      >
                        Stop Camera
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Manual Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">
                    Or enter QR token manually
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    value={qrToken}
                    onChange={(e) => setQrToken(e.target.value)}
                    placeholder="Paste QR token..."
                    onKeyDown={(e) => e.key === 'Enter' && handleManualScan()}
                  />
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled={
                      !qrToken.trim() ||
                      !selectedGateId ||
                      scanMutation.isPending
                    }
                    onClick={handleManualScan}
                  >
                    {scanMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <QrCode className="h-4 w-4 mr-2" />
                    )}
                    Verify Token
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
