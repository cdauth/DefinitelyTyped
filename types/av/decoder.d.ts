import { Bitstream } from "./bitstream";
import { TypedArray } from "./baseTypes";
import { Stream } from "./stream";
import { Buffer } from "./buffer";

export abstract class Decoder {
	static register(id: string, decoder: new () => Decoder): void;
	static find(id: string): Decoder | null;

	stream: Stream;
	bitstream: Bitstream;
	receivedFinalBuffer: boolean;

	decode(): boolean;
	seek(timestamp: number): number;

	abstract setCookie(cookie: Buffer): void;
	abstract readChunk(): TypedArray;

	on(event: "data", fn: (data: TypedArray, isLastBuffer: boolean) => void): void;
	on(event: "end", fn: () => void): void;
	on(event: "error", fn: (err: Error) => void): void;

	off(event: "data", fn: (data: TypedArray, isLastBuffer: boolean) => void): void;
	off(event: "end", fn: () => void): void;
	off(event: "error", fn: (err: Error) => void): void;

	once(event: "data", fn: (data: TypedArray, isLastBuffer: boolean) => void): void;
	once(event: "end", fn: () => void): void;
	once(event: "error", fn: (err: Error) => void): void;

	emit(event: "data", fn: (data: TypedArray, isLastBuffer: boolean) => void): void;
	emit(event: "end", fn: () => void): void;
	emit(event: "error", fn: (err: Error) => void): void;
}
