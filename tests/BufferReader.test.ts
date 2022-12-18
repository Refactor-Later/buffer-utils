import { describe, it, expect, vi } from "vitest";

import { BufferReader } from "@/BufferReader";

describe("BufferReader", () => {
	it("should create", () => {
		const length = 10;
		const reader = new BufferReader(Buffer.alloc(length));

		expect(reader).instanceOf(BufferReader);
		expect(reader.position).toEqual(0);
		expect(reader.length).toEqual(length);
	});

	it("should append", () => {
		const buff1: Buffer = Buffer.alloc(10);
		const buff2: Buffer = Buffer.alloc(5);

		const reader: BufferReader = new BufferReader(buff1);
		const concatSpy = vi.spyOn(Buffer, "concat");

		expect(reader.append(buff2)).toEqual(reader);

		expect(reader.position).toEqual(0);
		expect(reader.length).toEqual(buff1.length + buff2.length);

		expect(concatSpy).toHaveBeenCalledOnce();
		expect(concatSpy).toHaveBeenCalledWith([buff1, buff2]);
	});

	it("should give the nextString", () => {
		const value = "Hello World!";
		const buffer: Buffer = Buffer.from(value, "utf-8");

		const readSpy = vi.spyOn(buffer, "toString").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextString(value.length, "utf-8")).toEqual(value);
		expect(reader.position).toEqual(value.length);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith("utf-8", 0, value.length);
	});

	it("should give the nextTerminatedString", () => {
		const value = "Hello World!";
		const buffer: Buffer = Buffer.from(value + "\0Bye World!", "utf-8");

		const readSpy = vi.spyOn(buffer, "toString").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextTerminatedString("utf-8")).toEqual(value);
		expect(reader.position).toEqual(value.length + 1);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith("utf-8", 0, value.length);
	});

	it("should give the nextInt8", () => {
		const value = -128;
		const buffer: Buffer = Buffer.alloc(1);

		const readSpy = vi.spyOn(buffer, "readInt8").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextInt8()).toEqual(value);
		expect(reader.position).toEqual(1);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextUInt8", () => {
		const value = 255;
		const buffer: Buffer = Buffer.alloc(1);

		const readSpy = vi.spyOn(buffer, "readUint8").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextUint8()).toEqual(value);
		expect(reader.position).toEqual(1);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextInt16LE", () => {
		const value = -32768;
		const buffer: Buffer = Buffer.alloc(2);

		const readSpy = vi.spyOn(buffer, "readInt16LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextInt16LE()).toEqual(value);
		expect(reader.position).toEqual(2);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextInt16BE", () => {
		const value = -32768;
		const buffer: Buffer = Buffer.alloc(2);

		const readSpy = vi.spyOn(buffer, "readInt16BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextInt16BE()).toEqual(value);
		expect(reader.position).toEqual(2);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextUint16LE", () => {
		const value = 65535;
		const buffer: Buffer = Buffer.alloc(2);

		const readSpy = vi.spyOn(buffer, "readUint16LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextUint16LE()).toEqual(value);
		expect(reader.position).toEqual(2);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextUint16BE", () => {
		const value = 65535;
		const buffer: Buffer = Buffer.alloc(2);

		const readSpy = vi.spyOn(buffer, "readUint16BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextUint16BE()).toEqual(value);
		expect(reader.position).toEqual(2);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextInt32LE", () => {
		const value = -2147483648;
		const buffer: Buffer = Buffer.alloc(4);

		const readSpy = vi.spyOn(buffer, "readInt32LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextInt32LE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextInt32BE", () => {
		const value = -2147483648;
		const buffer: Buffer = Buffer.alloc(4);

		const readSpy = vi.spyOn(buffer, "readInt32BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextInt32BE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextUint32LE", () => {
		const value = 4294967295;
		const buffer: Buffer = Buffer.alloc(4);

		const readSpy = vi.spyOn(buffer, "readUint32LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextUint32LE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextUint32BE", () => {
		const value = 4294967295;
		const buffer: Buffer = Buffer.alloc(4);

		const readSpy = vi.spyOn(buffer, "readUint32BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextUint32BE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextBigInt64LE", () => {
		const value = -9223372036854775808n;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readBigInt64LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextBigInt64LE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextBigInt64BE", () => {
		const value = -9223372036854775808n;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readBigInt64BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextBigInt64BE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextBigUint64LE", () => {
		const value = 18446744073709552000n;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readBigUint64LE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextBigUint64LE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextBigUint64BE", () => {
		const value = 18446744073709552000n;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readBigUint64BE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextBigUint64BE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextFloatLE", () => {
		const value = 3.4028234663852886e38;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readFloatLE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextFloatLE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextFloatBE", () => {
		const value = 3.4028234663852886e38;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readFloatBE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextFloatBE()).toEqual(value);
		expect(reader.position).toEqual(4);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextDoubleLE", () => {
		const value = 3.4028234663852886e38;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readDoubleLE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextDoubleLE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give the nextDoubleBE", () => {
		const value = 3.4028234663852886e38;
		const buffer: Buffer = Buffer.alloc(8);

		const readSpy = vi.spyOn(buffer, "readDoubleBE").mockReturnValue(value);
		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextDoubleBE()).toEqual(value);
		expect(reader.position).toEqual(8);
		expect(readSpy).toHaveBeenCalledOnce();
		expect(readSpy).toHaveBeenCalledWith(0);
	});

	it("should give multiple values", () => {
		const buffer: Buffer = Buffer.alloc(35);

		buffer.write("Hello World!\0", 0, "utf-8");
		buffer.writeInt32BE(123, 13);
		buffer.writeBigUint64BE(1000n, 17);
		buffer.write("Bye World!", 25, "utf-8");

		const reader: BufferReader = new BufferReader(buffer);

		expect(reader.nextTerminatedString("utf-8")).toEqual("Hello World!");
		expect(reader.position).toEqual(13);

		expect(reader.nextInt32BE()).toEqual(123);
		expect(reader.position).toEqual(17);

		expect(reader.nextBigInt64BE()).toEqual(1000n);
		expect(reader.position).toEqual(25);

		expect(reader.nextString(10, "utf-8")).toEqual("Bye World!");
		expect(reader.position).toEqual(35);
	});
});
