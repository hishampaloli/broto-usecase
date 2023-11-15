import { EventEmitter } from "events";

const ev = new EventEmitter();

ev.on("userCreated", async (userId: string,message:string) => {

});

export { ev };
