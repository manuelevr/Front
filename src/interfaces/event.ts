export interface event {
    id: string;                 // Correspondiente a [id]
    event_date: string;        // Correspondiente a [event_date]
    event_type: string;        // Correspondiente a [event_type]
    event_subtype: string;     // Correspondiente a [event_subtype]
    event_detail: string;      // Correspondiente a [event_detail]
    StoreId: string;           // Correspondiente a [StoreId]
    DhubOrderId?: string;      // Correspondiente a [DhubOrderId], opcional
}