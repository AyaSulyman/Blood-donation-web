// Shared enums used across models, routes, and validation schemas.

export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodType = (typeof BLOOD_TYPES)[number];

export const USER_ROLES = ["donor", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Accepted by the donor search endpoint's "Urgency" filter (matches the UI's
// dropdown: Normal / High Priority / Critical). NOTE: none of the current
// collections store an urgency value on a donor or a request record, so this
// is currently accepted + validated but does not affect which donors are
// returned. See donor.service.ts for details — flag this to the team if
// urgency is meant to actually filter or rank donors.
export const URGENCY_LEVELS = ["normal", "high", "critical"] as const;
export type UrgencyLevel = (typeof URGENCY_LEVELS)[number];
