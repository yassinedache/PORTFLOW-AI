export const AI_TOOLS = [
    {
        name: 'check_availability',
        description: 'Check available time slots for truck booking at the port. Can filter by terminal and date.',
        parameters: {
            type: 'object',
            properties: {
                terminalId: {
                    type: 'string',
                    description: 'Optional terminal ID to filter availability',
                },
                date: {
                    type: 'string',
                    description: 'Optional date in YYYY-MM-DD format',
                },
            },
            required: [],
        },
    },
    {
        name: 'get_my_bookings',
        description: "Retrieve the current user's booking list with status and details.",
        parameters: {
            type: 'object',
            properties: {},
            required: [],
        },
    },
    {
        name: 'get_port_status',
        description: 'Get the current port status including active bookings, congestion levels, and terminal activity.',
        parameters: {
            type: 'object',
            properties: {},
            required: [],
        },
    },
    {
        name: 'get_heatmap',
        description: 'Get a heatmap of booking utilization for the next 7 days across terminals.',
        parameters: {
            type: 'object',
            properties: {
                terminalId: {
                    type: 'string',
                    description: 'Optional terminal ID to filter heatmap',
                },
            },
            required: [],
        },
    },
    {
        name: 'track_container',
        description: 'Track a container by its ISO number and get location/event history.',
        parameters: {
            type: 'object',
            properties: {
                containerNumber: {
                    type: 'string',
                    description: 'Container number in ISO 6346 format (e.g. MSKU1234567)',
                },
            },
            required: ['containerNumber'],
        },
    },
    {
        name: 'create_booking',
        description: 'Create a new booking for the carrier at a specific terminal and time slot.',
        parameters: {
            type: 'object',
            properties: {
                terminalId: {
                    type: 'string',
                    description: 'Terminal ID for the booking',
                },
                timeSlotId: {
                    type: 'string',
                    description: 'Time slot ID for the booking',
                },
                truckId: {
                    type: 'string',
                    description: 'Optional truck ID',
                },
                containerId: {
                    type: 'string',
                    description: 'Optional container ID',
                },
            },
            required: ['terminalId', 'timeSlotId'],
        },
    },
    {
        name: 'cancel_booking',
        description: "Cancel an existing booking by its ID. Only the booking's carrier can cancel.",
        parameters: {
            type: 'object',
            properties: {
                bookingId: {
                    type: 'string',
                    description: 'Booking ID to cancel',
                },
            },
            required: ['bookingId'],
        },
    },
];
export function toOpenAiTools() {
    return AI_TOOLS.map((tool) => ({
        type: 'function',
        function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters,
        },
    }));
}
//# sourceMappingURL=ai-tools.js.map