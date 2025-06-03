import { Severity } from "@prisma/client";

interface _props {
    severity: Severity;

}

export default function severityToNumber({ severity }: _props): number {
    switch (severity) {
        case "normal": return 1;
        case "hard": return 2;
        case "hardest": return 3;
        default: throw Error(`Severity "${severity}" invalid`);
    }
}