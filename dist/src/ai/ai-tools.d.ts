export interface AiToolDefinition {
    name: string;
    description: string;
    parameters: Record<string, any>;
}
export declare const AI_TOOLS: AiToolDefinition[];
export declare function toOpenAiTools(): {
    type: "function";
    function: {
        name: string;
        description: string;
        parameters: Record<string, any>;
    };
}[];
