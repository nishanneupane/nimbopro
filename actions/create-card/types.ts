import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
