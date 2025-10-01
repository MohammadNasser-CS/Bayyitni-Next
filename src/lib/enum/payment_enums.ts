export enum PaymentStatus {
    UNPAID = 'not_paid',
    PARTIAL = 'partial',
    PAID = 'paid',
}

export enum PaymentMethod {
    CASH = 'cash',
    IBAN_TRANSFER = 'iban_transfer',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, Record<string, string>> = {
    [PaymentStatus.UNPAID]: { en: "Unpaid", ar: "غير مدفوع" },
    [PaymentStatus.PARTIAL]: { en: "Partial Paid", ar: "من تم دفع جزء من المبلغ" },
    [PaymentStatus.PAID]: { en: "Paid", ar: "مدفوع" },
};
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, Record<string, string>> = {
    [PaymentMethod.CASH]: { en: "Cash", ar: "كاش" },
    [PaymentMethod.IBAN_TRANSFER]: { en: "Bank Transfer", ar: "تحويل بنكي" },
};