import EventBus from 'core/EventBus';

// eslint-disable-next-line no-shadow
export enum WSEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export default class WS extends EventBus {
  private socket: WebSocket | null = null;

  private pingInterval = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    console.log('open');

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSEvents.Connected, () => {
        resolve();
      });

      this.off(WSEvents.Close, () => {
        reject();
      });
    });
  }

  public close() {
    console.log('close');
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({type: 'ping'});
    }, 5000);

    this.on(WSEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSEvents.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(WSEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      let data = {} as any;
      try {
        data = JSON.parse(message.data);
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.error(e.message);
      }

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WSEvents.Message, data);
    });
  }
}
