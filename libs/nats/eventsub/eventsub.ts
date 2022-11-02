// @generated by protobuf-ts 2.8.1 with parameter long_type_string,generate_dependencies
// @generated from protobuf file "eventsub.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message SubscribeToEvents
 */
export interface SubscribeToEvents {
    /**
     * @generated from protobuf field: string channelId = 1;
     */
    channelId: string;
}
/**
 * @generated from protobuf message SubscribeToEventsResponse
 */
export interface SubscribeToEventsResponse {
}
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeToEvents$Type extends MessageType<SubscribeToEvents> {
    constructor() {
        super("SubscribeToEvents", [
            { no: 1, name: "channelId", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<SubscribeToEvents>): SubscribeToEvents {
        const message = { channelId: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeToEvents>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeToEvents): SubscribeToEvents {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string channelId */ 1:
                    message.channelId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: SubscribeToEvents, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string channelId = 1; */
        if (message.channelId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.channelId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message SubscribeToEvents
 */
export const SubscribeToEvents = new SubscribeToEvents$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SubscribeToEventsResponse$Type extends MessageType<SubscribeToEventsResponse> {
    constructor() {
        super("SubscribeToEventsResponse", []);
    }
    create(value?: PartialMessage<SubscribeToEventsResponse>): SubscribeToEventsResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SubscribeToEventsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SubscribeToEventsResponse): SubscribeToEventsResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: SubscribeToEventsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message SubscribeToEventsResponse
 */
export const SubscribeToEventsResponse = new SubscribeToEventsResponse$Type();
export const SUBJECTS = {SUBSCTUBE_TO_EVENTS_BY_CHANNEL_ID: "subscribeToEventsByChannelId"}