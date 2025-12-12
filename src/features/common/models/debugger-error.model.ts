import { DebuggerTaskValues } from "@/features/common/values/debugger-task.values";
import { DebuggerInputValues } from "@/features/common/values/debugger-input.values";

export interface DebuggerErrorModel {
  task: DebuggerTaskValues;
  input: DebuggerInputValues;
  message: string;
}

export interface DebuggerErrorModelWithData<T> extends DebuggerErrorModel {
  data?: T;
}
