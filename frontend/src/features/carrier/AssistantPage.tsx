import { useState, useRef, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Loader2,
  MessageSquarePlus,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageTransition } from '@/components/shared';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { assistantApi } from '@/lib/api';
import { queryKeys } from '@/lib/constants';
import type { AiSession, AiMessage } from '@/types';
import { AiMessageRole } from '@/types';

const SUGGESTED_PROMPTS = [
  'Is my next booking at risk?',
  'Show me available slots for tomorrow',
  'What is the busiest terminal today?',
  'Summarise my charges this week',
  'Which of my containers are ready?',
];

/** Threshold in pixels to consider "near bottom" */
const SCROLL_THRESHOLD = 100;

/** Patterns to detect "new chat" or "reset" commands */
const NEW_CHAT_PATTERNS =
  /^(new\s*chat|start\s*new\s*chat|reset\s*chat|reset|start\s*over)$/i;

export default function AssistantPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    // Restore session ID from sessionStorage so refresh keeps the conversation
    return sessionStorage.getItem('portflow-ai-session');
  });
  const [messages, setMessages] = useState<AiMessage[]>([]);

  // Create or reuse session
  const createSession = useMutation({
    mutationFn: assistantApi.createSession,
    onSuccess: (session: AiSession) => {
      setSessionId(session.id);
      sessionStorage.setItem('portflow-ai-session', session.id);
    },
  });

  // Start a new chat (clear history, reset context)
  const newChat = useMutation({
    mutationFn: assistantApi.newChat,
    onMutate: () => {
      // Immediately clear UI for responsiveness
      setMessages([]);
      setInput('');
    },
    onSuccess: (response) => {
      setSessionId(response.sessionId);
      sessionStorage.setItem('portflow-ai-session', response.sessionId);
      // Add the greeting message
      setMessages([
        {
          role: 'assistant' as const,
          content: response.greeting,
        } as unknown as AiMessage,
      ]);
      setAutoScroll(true);
      inputRef.current?.focus();
      toast.success('New chat started');
    },
    onError: () => toast.error('Failed to start new chat'),
  });

  // Load history when session exists
  const { isFetching: loadingHistory } = useQuery({
    queryKey: queryKeys.aiHistory(sessionId ?? ''),
    queryFn: () => assistantApi.getHistory(sessionId!),
    enabled: !!sessionId,
    refetchOnMount: 'always' as const,
    select: (data: AiMessage[]) => {
      // only set state once via select side-effect guard
      return data;
    },
  });

  // Sync history into messages when query returns data
  useEffect(() => {
    if (!sessionId) return;
    assistantApi
      .getHistory(sessionId)
      .then((history) => {
        if (history.length) setMessages(history);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Send message
  const sendMessage = useMutation({
    mutationFn: (text: string) => {
      if (!sessionId) throw new Error('No session');
      return assistantApi.query({ sessionId, message: text });
    },
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: response.response,
        } as unknown as AiMessage,
      ]);
    },
    onError: () => toast.error('Failed to get response'),
  });

  // Init session on mount only if no existing session
  useEffect(() => {
    if (!sessionId && !createSession.isPending) {
      createSession.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if user is near the bottom of the scroll area
  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD;
  }, []);

  // Handle scroll to track if user has scrolled up
  const handleScroll = useCallback(() => {
    setAutoScroll(isNearBottom());
  }, [isNearBottom]);

  // Auto-scroll: only scroll if user is near bottom or just sent a message
  useEffect(() => {
    if (autoScroll) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, sendMessage.isPending, autoScroll]);

  // Scroll to bottom on initial load when history is loaded
  useEffect(() => {
    if (messages.length > 0) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'auto' });
        setAutoScroll(true);
      }, 50);
    }
  }, [sessionId]); // Only on session change (initial load)

  const handleSend = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || sendMessage.isPending || newChat.isPending) return;

    // Check for "new chat" command
    if (NEW_CHAT_PATTERNS.test(msg)) {
      setInput('');
      newChat.mutate();
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user' as const, content: msg } as unknown as AiMessage,
    ]);
    setInput('');
    setAutoScroll(true); // Always scroll when user sends a message
    sendMessage.mutate(msg);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    if (newChat.isPending) return;
    newChat.mutate();
  };

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-7rem)]">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              AI Assistant
            </h1>
            <p className="text-sm text-muted-foreground">
              Ask about bookings, slots, risk predictions, and more
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            disabled={newChat.isPending}
            className="gap-2"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea
            className="flex-1 p-4"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Welcome */}
              {messages.length === 0 && !sendMessage.isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Bot className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">How can I help?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try one of these or type your own question
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED_PROMPTS.map((p) => (
                      <Button
                        key={p}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleSend(p)}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => {
                  const isUser =
                    (msg.role as string) === 'user' ||
                    msg.role === AiMessageRole.USER;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-cyan-400" />
                        </div>
                      )}
                      <div
                        className={`
                          max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                          ${
                            isUser
                              ? 'bg-cyan-500/20 text-foreground rounded-br-md'
                              : 'glass rounded-bl-md'
                          }
                        `}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {isUser && (
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing indicator */}
              {sendMessage.isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 items-start"
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="glass rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 rounded-full bg-cyan-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: d * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Scroll anchor */}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <CardContent className="p-4 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2 max-w-2xl mx-auto"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your port operations…"
                disabled={sendMessage.isPending || !sessionId}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                variant="glow"
                disabled={!input.trim() || sendMessage.isPending}
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
