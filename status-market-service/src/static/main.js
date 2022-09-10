const app = new Vue({
  el: '#app',
  data: {
    title: 'Nestjs Websockets status-market',
    name: '',
    text: '',
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  async created() {
    this.socket = io('http://localhost:3000');
    const findstatus-markets = await fetch('http://localhost:3000/status-market');
    this.socket.on('msgToClient', message => {
      this.receivedMessage(message);
      this.receivedMessage(findstatus-markets);
    });
  },
});
