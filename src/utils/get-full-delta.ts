import { intervalToDuration } from "date-fns";

interface _props {
    dateStart: Date;
    dateStop: Date;
}

export default function getFullDelta({ dateStart, dateStop }: _props): string {
    const duration = intervalToDuration({ start: dateStart, end: dateStop });

    const compact = `
    ${duration.months || "00"}:
    ${duration.days || "00"}:
    ${duration.hours || "00"}:
    ${duration.minutes || "00"}:
    ${duration.seconds || "00"}`
        .replace(/\s+/g, "");


    return compact;
}