import assert from "assert";

export class BufferReader {
	private _buffer: Buffer;
	private _position = 0;

	get position(): number {
		return this._position;
	}

	set position(position: number) {
		assert(position >= 0 && position <= this.length, "Position is invalid");

		this._position = position;
	}

	get length(): number {
		return this._buffer.length;
	}

	constructor(buffer: Buffer) {
		this._buffer = buffer;
	}

	private nextNumber<T>(decoder: (this: Buffer, offset: number) => T, size: number): T {
		assert(this._position + size <= this.length, "Out of bounds");

		this._position += size;
		return decoder.call(this._buffer, this._position - size);
	}

	public has(count: number): boolean {
		assert(count >= 0, "Count must non negative");

		return this._position + count < this.length;
	}

	public append(other: Buffer | Uint8Array): BufferReader {
		this._buffer = Buffer.concat([this._buffer, other]);
		return this;
	}

	public seek(position: number): BufferReader {
		this.position = position;
		return this;
	}

	public move(diff: number): BufferReader {
		this.position = this._position + diff;
		return this;
	}

	public next(length: number): Buffer {
		assert(length >= 0, "Length must be non negative");
		assert(this._position + length <= this.length, "Out of bounds");

		const targetBuffer = Buffer.alloc(length);
		this._buffer.copy(targetBuffer, 0, this._position, this._position + length);
		this._position += length;
		return targetBuffer;
	}

	public rest(): Buffer {
		const remaining = this.length - this._position;
		assert(remaining >= 0, "Reader in invalid state, the position is out of bounds. position > length");

		return this.next(remaining);
	}

	public reset(): BufferReader {
		this.position = 0;
		return this;
	}

	//#region String

	public nextString(length: number, encoding?: BufferEncoding): string {
		assert(length >= 0, "Length must be non negative");
		assert(this._position + length <= this.length, "Out of bounds");

		const start = this._position;
		this._position += length;

		return this._buffer.toString(encoding, start, this._position);
	}

	public nextTerminatedString(encoding?: BufferEncoding, terminator: number | string = "\0"): string {
		let length = 0;

		if (typeof terminator === "string") {
			assert(terminator.length === 1, "Terminator can only be a single character string.");

			terminator = terminator.charCodeAt(0);
		}

		while (length + this._position < this.length && this._buffer[this._position + length] !== terminator) {
			length++;
		}

		assert(length <= this.length && this._buffer[this._position + length] === terminator, "Out of bounds");

		const str = this.nextString(length, encoding);
		this.position++;

		return str;
	}

	//#endregion
	//#region Int8

	public nextInt8(): number {
		return this.nextNumber<number>(this._buffer.readInt8, 1);
	}

	public nextUint8(): number {
		return this.nextNumber<number>(this._buffer.readUint8, 1);
	}

	//#endregion
	//#region Int16

	public nextInt16LE(): number {
		return this.nextNumber<number>(this._buffer.readInt16LE, 2);
	}

	public nextInt16BE(): number {
		return this.nextNumber<number>(this._buffer.readInt16BE, 2);
	}

	//#endregion
	//#region UInt16

	public nextUint16LE(): number {
		return this.nextNumber<number>(this._buffer.readUint16LE, 2);
	}

	public nextUint16BE(): number {
		return this.nextNumber<number>(this._buffer.readUint16BE, 2);
	}

	//#endregion
	//#region Int32

	public nextInt32LE(): number {
		return this.nextNumber<number>(this._buffer.readInt32LE, 4);
	}

	public nextInt32BE(): number {
		return this.nextNumber<number>(this._buffer.readInt32BE, 4);
	}

	//#endregion
	//#region UInt32

	public nextUint32LE(): number {
		return this.nextNumber<number>(this._buffer.readUint32LE, 4);
	}

	public nextUint32BE(): number {
		return this.nextNumber<number>(this._buffer.readUint32BE, 4);
	}

	//#endregion
	//#region BigInt64

	public nextBigInt64LE(): bigint {
		return this.nextNumber<bigint>(this._buffer.readBigInt64LE, 8);
	}

	public nextBigInt64BE(): bigint {
		return this.nextNumber<bigint>(this._buffer.readBigInt64BE, 8);
	}

	//#endregion
	//#region BigUInt64

	public nextBigUint64LE(): bigint {
		return this.nextNumber<bigint>(this._buffer.readBigUint64LE, 8);
	}

	public nextBigUint64BE(): bigint {
		return this.nextNumber<bigint>(this._buffer.readBigUint64BE, 8);
	}

	//#endregion
	//#region Float

	public nextFloatLE(): number {
		return this.nextNumber<number>(this._buffer.readFloatLE, 4);
	}

	public nextFloatBE(): number {
		return this.nextNumber<number>(this._buffer.readFloatBE, 4);
	}

	//#endregion
	//#region Double

	public nextDoubleLE(): number {
		return this.nextNumber<number>(this._buffer.readDoubleLE, 8);
	}

	public nextDoubleBE(): number {
		return this.nextNumber<number>(this._buffer.readDoubleBE, 8);
	}

	//#endregion
}
