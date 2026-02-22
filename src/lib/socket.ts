import type { Server } from "socket.io";

export const getIO = (): Server | undefined => {
  return (globalThis as typeof globalThis & { io?: Server }).io;
};

export const emitEvent = (event: string, payload: unknown) => {
  const io = getIO();
  if (io) {
    io.emit(event, payload);
  }
};
