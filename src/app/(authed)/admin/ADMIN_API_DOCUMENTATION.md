# Bayyitni Admin API Documentation

## Overview
This document describes all API endpoints required for the Bayyitni Admin Dashboard. All endpoints require admin authentication and should return appropriate error responses for unauthorized access.

---

## Authentication

All admin endpoints require authentication with an admin role.

### Headers Required
\`\`\`
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json
\`\`\`

### Error Responses
\`\`\`json
// 401 Unauthorized
{
  "error": "Unauthorized",
  "message": "Authentication required"
}

// 403 Forbidden
{
  "error": "Forbidden",
  "message": "Admin access required"
}
\`\`\`

---

## 1. Dashboard Endpoints

### GET /api/admin/statistics
Get platform-wide statistics for the admin dashboard.

**Response:**
\`\`\`json
{
  "listings": {
    "total": 45,
    "verified": 38,
    "pending": 5,
    "rejected": 2
  },
  "rooms": {
    "total": 120,
    "totalBeds": 450,
    "availableBeds": 180,
    "occupiedBeds": 270,
    "occupancyRate": 60
  },
  "bookings": {
    "total": 150,
    "pending": 12,
    "approved": 8,
    "active": 85,
    "completed": 40,
    "cancelled": 5
  },
  "revenue": {
    "monthly": 27000,
    "total": 324000,
    "currency": "SAR"
  },
  "users": {
    "total": 150,
    "students": 120,
    "landlords": 28,
    "admins": 2
  }
}
\`\`\`

### GET /api/admin/recent-activity
Get recent platform activities.

**Query Parameters:**
- `limit` (optional): Number of activities to return (default: 10)
- `type` (optional): Filter by activity type (listing, payment, booking, user, system)

**Response:**
\`\`\`json
{
  "activities": [
    {
      "id": "act_123",
      "type": "listing",
      "message": "New listing submitted for verification",
      "details": {
        "listingId": "list_456",
        "listingTitle": "Al-Noor Residence",
        "landlordId": "user_789"
      },
      "timestamp": "2025-01-04T10:30:00Z",
      "priority": "normal"
    },
    {
      "id": "act_124",
      "type": "payment",
      "message": "Payment confirmation required",
      "details": {
        "paymentId": "pay_321",
        "bookingId": "book_654",
        "amount": 1200
      },
      "timestamp": "2025-01-04T08:15:00Z",
      "priority": "high"
    }
  ]
}
\`\`\`

---

## 2. Listing Verification Endpoints

### GET /api/admin/listings
Get all listings with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by verification_status (pending, verified, rejected)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
\`\`\`json
{
  "listings": [
    {
      "id": "list_123",
      "landlordId": "user_456",
      "landlord": {
        "id": "user_456",
        "name": "Ahmed Al-Rashid",
        "email": "ahmed@example.com",
        "phone": "+966501234567"
      },
      "buildingName": "Al-Noor Residence",
      "buildingNumber": "123",
      "title": "Modern Student Accommodation near KSU",
      "description": "Fully furnished rooms with all amenities...",
      "floorNumber": 3,
      "numberOfRooms": 4,
      "location": {
        "lat": 24.7136,
        "lon": 46.6753,
        "city": "Riyadh",
        "country": "Saudi Arabia"
      },
      "isActive": true,
      "verificationStatus": "pending",
      "genderPreference": "male",
      "amenities": {
        "hasGas": true,
        "hasElectricity": true,
        "hasWater": true,
        "hasInternet": true
      },
      "propertyType": "apartment",
      "primaryImageUrl": "https://example.com/images/listing_123.jpg",
      "createdAt": "2025-01-03T10:00:00Z",
      "updatedAt": "2025-01-03T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 45,
    "itemsPerPage": 20
  }
}
\`\`\`

### GET /api/admin/listings/:id
Get detailed information about a specific listing.

**Response:**
\`\`\`json
{
  "listing": {
    "id": "list_123",
    "landlordId": "user_456",
    "landlord": {
      "id": "user_456",
      "name": "Ahmed Al-Rashid",
      "email": "ahmed@example.com",
      "phone": "+966501234567",
      "profileImageUrl": "https://example.com/profiles/user_456.jpg"
    },
    "buildingName": "Al-Noor Residence",
    "buildingNumber": "123",
    "title": "Modern Student Accommodation near KSU",
    "description": "Fully furnished rooms with all amenities...",
    "floorNumber": 3,
    "numberOfRooms": 4,
    "location": {
      "lat": 24.7136,
      "lon": 46.6753,
      "city": "Riyadh",
      "country": "Saudi Arabia"
    },
    "isActive": true,
    "verificationStatus": "pending",
    "genderPreference": "male",
    "amenities": {
      "hasGas": true,
      "hasElectricity": true,
      "hasWater": true,
      "hasInternet": true
    },
    "propertyType": "apartment",
    "primaryImageUrl": "https://example.com/images/listing_123.jpg",
    "createdAt": "2025-01-03T10:00:00Z",
    "updatedAt": "2025-01-03T10:00:00Z"
  }
}
\`\`\`

### GET /api/admin/listings/:id/rooms
Get all rooms for a specific listing.

**Response:**
\`\`\`json
{
  "rooms": [
    {
      "id": "room_789",
      "propertyListingId": "list_123",
      "description": "Spacious room with private bathroom",
      "pricePerMonth": 1200,
      "availableFrom": "2025-02-01T00:00:00Z",
      "isActive": true,
      "isAvailable": true,
      "roomType": "private",
      "numberOfBeds": 2,
      "numberOfAvailableBeds": 1,
      "amenities": {
        "hasInternalBathroom": true,
        "hasInternalBalcony": false,
        "hasAC": true,
        "hasOffice": true
      },
      "images": [
        {
          "id": "img_001",
          "imageUrl": "https://example.com/rooms/room_789_1.jpg",
          "sortOrder": 1
        },
        {
          "id": "img_002",
          "imageUrl": "https://example.com/rooms/room_789_2.jpg",
          "sortOrder": 2
        }
      ],
      "createdAt": "2025-01-03T10:00:00Z",
      "updatedAt": "2025-01-03T10:00:00Z"
    }
  ]
}
\`\`\`

### POST /api/admin/listings/:id/approve
Approve a listing for publication.

**Request Body:**
\`\`\`json
{
  "adminNotes": "All documentation verified. Property meets standards."
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Listing approved successfully",
  "listing": {
    "id": "list_123",
    "verificationStatus": "verified",
    "verifiedAt": "2025-01-04T12:00:00Z",
    "verifiedBy": "admin_001"
  }
}
\`\`\`

### POST /api/admin/listings/:id/reject
Reject a listing with a reason.

**Request Body:**
\`\`\`json
{
  "reason": "Incomplete documentation. Missing property ownership proof.",
  "adminNotes": "Requested additional documents from landlord."
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Listing rejected",
  "listing": {
    "id": "list_123",
    "verificationStatus": "rejected",
    "rejectionReason": "Incomplete documentation. Missing property ownership proof.",
    "rejectedAt": "2025-01-04T12:00:00Z",
    "rejectedBy": "admin_001"
  }
}
\`\`\`

---

## 3. Booking Management Endpoints

### GET /api/admin/bookings
Get all bookings with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by status (pending, approved, active, completed, cancelled)
- `paymentStatus` (optional): Filter by payment status (unpaid, partial, paid)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
\`\`\`json
{
  "bookings": [
    {
      "id": "book_123",
      "student": {
        "id": "user_789",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "phone": "+966501234567",
        "university": "King Saud University"
      },
      "listing": {
        "id": "list_456",
        "title": "Modern Student Accommodation",
        "buildingName": "Al-Noor Residence",
        "city": "Riyadh"
      },
      "room": {
        "id": "room_789",
        "description": "Spacious room with private bathroom",
        "pricePerMonth": 1200
      },
      "bedIndex": 1,
      "status": "pending",
      "startDate": "2025-02-01T00:00:00Z",
      "endDate": "2025-08-31T00:00:00Z",
      "paymentStatus": "unpaid",
      "totalAmount": 8400,
      "createdAt": "2025-01-03T10:00:00Z",
      "updatedAt": "2025-01-03T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 8,
    "totalItems": 150,
    "itemsPerPage": 20
  }
}
\`\`\`

### GET /api/admin/bookings/:id
Get detailed information about a specific booking.

**Response:**
\`\`\`json
{
  "booking": {
    "id": "book_123",
    "student": {
      "id": "user_789",
      "name": "Sara Ahmed",
      "email": "sara@example.com",
      "phone": "+966501234567",
      "profileImageUrl": "https://example.com/profiles/user_789.jpg",
      "university": "King Saud University",
      "college": "Engineering",
      "degree": "Bachelor"
    },
    "listing": {
      "id": "list_456",
      "title": "Modern Student Accommodation",
      "buildingName": "Al-Noor Residence",
      "buildingNumber": "123",
      "city": "Riyadh",
      "landlord": {
        "id": "user_456",
        "name": "Ahmed Al-Rashid",
        "phone": "+966501234567"
      }
    },
    "room": {
      "id": "room_789",
      "description": "Spacious room with private bathroom",
      "roomType": "private",
      "pricePerMonth": 1200
    },
    "bedIndex": 1,
    "status": "pending",
    "startDate": "2025-02-01T00:00:00Z",
    "endDate": "2025-08-31T00:00:00Z",
    "paymentStatus": "unpaid",
    "totalAmount": 8400,
    "adminNotes": [],
    "createdAt": "2025-01-03T10:00:00Z",
    "updatedAt": "2025-01-03T10:00:00Z"
  }
}
\`\`\`

### PUT /api/admin/bookings/:id/status
Update booking status.

**Request Body:**
\`\`\`json
{
  "status": "approved",
  "notes": "Payment verified. Booking approved for move-in on Feb 1st."
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Booking status updated successfully",
  "booking": {
    "id": "book_123",
    "status": "approved",
    "updatedAt": "2025-01-04T12:00:00Z",
    "updatedBy": "admin_001"
  }
}
\`\`\`

### POST /api/admin/bookings/:id/notes
Add admin notes to a booking.

**Request Body:**
\`\`\`json
{
  "note": "Contacted student to confirm move-in date. Awaiting response."
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Note added successfully",
  "note": {
    "id": "note_123",
    "bookingId": "book_123",
    "adminId": "admin_001",
    "adminName": "Admin User",
    "content": "Contacted student to confirm move-in date. Awaiting response.",
    "createdAt": "2025-01-04T12:00:00Z"
  }
}
\`\`\`

---

## 4. Payment Management Endpoints

### GET /api/admin/payments
Get all payments with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by status (pending, confirmed, rejected)
- `method` (optional): Filter by payment method (cash, iban_transfer)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
\`\`\`json
{
  "payments": [
    {
      "id": "pay_123",
      "booking": {
        "id": "book_456",
        "student": {
          "id": "user_789",
          "name": "Sara Ahmed",
          "email": "sara@example.com"
        },
        "listing": {
          "id": "list_321",
          "title": "Modern Student Accommodation",
          "buildingName": "Al-Noor Residence"
        }
      },
      "amount": 1200,
      "method": "iban_transfer",
      "status": "pending",
      "referenceNote": "Transfer from Sara Ahmed - Booking #456",
      "proofImageUrl": "https://example.com/payments/proof_123.jpg",
      "timestamp": "2025-01-03T14:30:00Z",
      "createdAt": "2025-01-03T14:30:00Z",
      "updatedAt": "2025-01-03T14:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 95,
    "itemsPerPage": 20
  }
}
\`\`\`

### GET /api/admin/payments/:id
Get detailed information about a specific payment.

**Response:**
\`\`\`json
{
  "payment": {
    "id": "pay_123",
    "booking": {
      "id": "book_456",
      "student": {
        "id": "user_789",
        "name": "Sara Ahmed",
        "email": "sara@example.com",
        "phone": "+966501234567"
      },
      "listing": {
        "id": "list_321",
        "title": "Modern Student Accommodation",
        "buildingName": "Al-Noor Residence"
      },
      "room": {
        "id": "room_654",
        "description": "Spacious room with private bathroom"
      },
      "startDate": "2025-02-01T00:00:00Z",
      "endDate": "2025-08-31T00:00:00Z"
    },
    "amount": 1200,
    "method": "iban_transfer",
    "status": "pending",
    "referenceNote": "Transfer from Sara Ahmed - Booking #456",
    "proofImageUrl": "https://example.com/payments/proof_123.jpg",
    "bankDetails": {
      "accountName": "Bayyitni Platform",
      "iban": "SA1234567890123456789012",
      "bankName": "Al Rajhi Bank"
    },
    "timestamp": "2025-01-03T14:30:00Z",
    "createdAt": "2025-01-03T14:30:00Z",
    "updatedAt": "2025-01-03T14:30:00Z"
  }
}
\`\`\`

### POST /api/admin/payments/:id/confirm
Confirm a payment.

**Request Body:**
\`\`\`json
{
  "adminNotes": "Payment verified in bank account. Transfer ID: TXN123456"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Payment confirmed successfully",
  "payment": {
    "id": "pay_123",
    "status": "confirmed",
    "confirmedAt": "2025-01-04T12:00:00Z",
    "confirmedBy": "admin_001"
  }
}
\`\`\`

### POST /api/admin/payments/:id/reject
Reject a payment.

**Request Body:**
\`\`\`json
{
  "reason": "Transfer amount does not match booking amount",
  "adminNotes": "Requested student to submit correct payment proof"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Payment rejected",
  "payment": {
    "id": "pay_123",
    "status": "rejected",
    "rejectionReason": "Transfer amount does not match booking amount",
    "rejectedAt": "2025-01-04T12:00:00Z",
    "rejectedBy": "admin_001"
  }
}
\`\`\`

### POST /api/admin/payments
Create a manual payment record.

**Request Body:**
\`\`\`json
{
  "bookingId": "book_456",
  "amount": 1200,
  "method": "cash",
  "referenceNote": "Cash payment received at office",
  "timestamp": "2025-01-04T10:00:00Z"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Payment record created successfully",
  "payment": {
    "id": "pay_789",
    "bookingId": "book_456",
    "amount": 1200,
    "method": "cash",
    "status": "confirmed",
    "referenceNote": "Cash payment received at office",
    "timestamp": "2025-01-04T10:00:00Z",
    "createdBy": "admin_001",
    "createdAt": "2025-01-04T12:00:00Z"
  }
}
\`\`\`

### GET /api/admin/payments/stats
Get payment statistics.

**Query Parameters:**
- `startDate` (optional): Start date for statistics (ISO 8601)
- `endDate` (optional): End date for statistics (ISO 8601)

**Response:**
\`\`\`json
{
  "stats": {
    "totalPayments": 95,
    "totalAmount": 114000,
    "confirmedPayments": 78,
    "confirmedAmount": 93600,
    "pendingPayments": 12,
    "pendingAmount": 14400,
    "rejectedPayments": 5,
    "rejectedAmount": 6000,
    "byMethod": {
      "cash": {
        "count": 25,
        "amount": 30000
      },
      "iban_transfer": {
        "count": 70,
        "amount": 84000
      }
    },
    "currency": "SAR"
  }
}
\`\`\`

---

## 5. Notification Endpoints

### GET /api/admin/notifications
Get admin notifications.

**Query Parameters:**
- `type` (optional): Filter by type (system, booking, payment, listing)
- `isRead` (optional): Filter by read status (true, false)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
\`\`\`json
{
  "notifications": [
    {
      "id": "notif_123",
      "userId": "admin_001",
      "message": "New listing submitted for verification: Al-Noor Residence",
      "type": "listing",
      "isRead": false,
      "metadata": {
        "listingId": "list_456",
        "landlordId": "user_789"
      },
      "createdAt": "2025-01-04T10:00:00Z"
    },
    {
      "id": "notif_124",
      "userId": "admin_001",
      "message": "Payment confirmation required for booking #123",
      "type": "payment",
      "isRead": false,
      "metadata": {
        "paymentId": "pay_456",
        "bookingId": "book_123",
        "amount": 1200
      },
      "createdAt": "2025-01-04T09:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 45,
    "itemsPerPage": 20
  }
}
\`\`\`

### GET /api/admin/notifications/unread
Get count of unread notifications.

**Response:**
\`\`\`json
{
  "unreadCount": 12,
  "byType": {
    "system": 2,
    "booking": 3,
    "payment": 5,
    "listing": 2
  }
}
\`\`\`

### PUT /api/admin/notifications/:id/read
Mark a notification as read.

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Notification marked as read",
  "notification": {
    "id": "notif_123",
    "isRead": true,
    "readAt": "2025-01-04T12:00:00Z"
  }
}
\`\`\`

### PUT /api/admin/notifications/mark-all-read
Mark all notifications as read.

**Response:**
\`\`\`json
{
  "success": true,
  "message": "All notifications marked as read",
  "updatedCount": 12
}
\`\`\`

### DELETE /api/admin/notifications/:id
Delete a notification.

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Notification deleted successfully"
}
\`\`\`

---

## 6. Admin Profile Endpoints

### GET /api/admin/profile
Get admin profile information.

**Response:**
\`\`\`json
{
  "admin": {
    "id": "admin_001",
    "name": "Admin User",
    "email": "admin@bayyitni.com",
    "phone": "+966501234567",
    "role": "admin",
    "profileImageUrl": "https://example.com/profiles/admin_001.jpg",
    "department": "Platform Administration",
    "bio": "Platform administrator managing listings and payments",
    "permissions": {
      "listingManagement": true,
      "paymentManagement": true,
      "userManagement": true,
      "systemAnalytics": true
    },
    "isActive": true,
    "emailVerified": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2025-01-04T12:00:00Z"
  }
}
\`\`\`

### PUT /api/admin/profile
Update admin profile.

**Request Body:**
\`\`\`json
{
  "name": "Admin User",
  "phone": "+966501234567",
  "department": "Platform Administration",
  "bio": "Platform administrator managing listings and payments"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Profile updated successfully",
  "admin": {
    "id": "admin_001",
    "name": "Admin User",
    "phone": "+966501234567",
    "department": "Platform Administration",
    "bio": "Platform administrator managing listings and payments",
    "updatedAt": "2025-01-04T12:00:00Z"
  }
}
\`\`\`

### POST /api/admin/profile/avatar
Upload profile avatar.

**Request:**
- Content-Type: multipart/form-data
- Body: Form data with 'avatar' file field

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "profileImageUrl": "https://example.com/profiles/admin_001.jpg"
}
\`\`\`

### POST /api/admin/profile/password
Change admin password.

**Request Body:**
\`\`\`json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Password changed successfully"
}
\`\`\`

### POST /api/admin/profile/2fa
Setup two-factor authentication.

**Request Body:**
\`\`\`json
{
  "enable": true
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "2FA setup initiated",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "secret": "JBSWY3DPEHPK3PXP",
  "backupCodes": [
    "12345678",
    "87654321",
    "11223344"
  ]
}
\`\`\`

---

## Common Error Responses

### 400 Bad Request
\`\`\`json
{
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "details": {
    "field": "status",
    "issue": "Invalid status value"
  }
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "error": "Not Found",
  "message": "Resource not found",
  "resourceType": "listing",
  "resourceId": "list_123"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "requestId": "req_abc123"
}
\`\`\`

---

## Data Models

### User
\`\`\`typescript
{
  id: string
  name: string
  email: string
  role: "student" | "landlord" | "admin"
  phone: string
  profileImageUrl?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### PropertyListing
\`\`\`typescript
{
  id: string
  landlordId: string
  buildingName: string
  buildingNumber: string
  title: string
  description: string
  floorNumber: number
  numberOfRooms: number
  location: {
    lat: number
    lon: number
    city: string
    country: string
  }
  isActive: boolean
  verificationStatus: "pending" | "verified" | "rejected"
  genderPreference: "male" | "female" | "mixed"
  amenities: {
    hasGas: boolean
    hasElectricity: boolean
    hasWater: boolean
    hasInternet: boolean
  }
  propertyType: string
  primaryImageUrl?: string
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Room
\`\`\`typescript
{
  id: string
  propertyListingId: string
  description: string
  pricePerMonth: number
  availableFrom: Date
  isActive: boolean
  isAvailable: boolean
  roomType: string
  numberOfBeds: number
  numberOfAvailableBeds: number
  amenities: {
    hasInternalBathroom: boolean
    hasInternalBalcony: boolean
    hasAC: boolean
    hasOffice: boolean
  }
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Booking
\`\`\`typescript
{
  id: string
  studentId: string
  listingId: string
  roomId: string
  bedIndex?: number
  status: "pending" | "approved" | "rejected" | "active" | "cancelled" | "completed"
  startDate: Date
  endDate: Date
  paymentStatus: "unpaid" | "partial" | "paid"
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Payment
\`\`\`typescript
{
  id: string
  bookingId: string
  amount: number
  method: "cash" | "iban_transfer"
  status: "pending" | "confirmed" | "rejected"
  referenceNote?: string
  proofImageUrl?: string
  timestamp: Date
  createdAt: Date
  updatedAt: Date
}
\`\`\`

### Notification
\`\`\`typescript
{
  id: string
  userId: string
  message: string
  type: "system" | "booking" | "payment" | "listing"
  isRead: boolean
  metadata?: object
  createdAt: Date
}
\`\`\`

---

## Notes for Backend Developer

1. **Authentication**: All endpoints require JWT authentication with admin role verification
2. **Pagination**: Use consistent pagination across all list endpoints
3. **Timestamps**: All dates should be in ISO 8601 format
4. **File Uploads**: Support multipart/form-data for image uploads
5. **Validation**: Implement proper input validation and return detailed error messages
6. **Logging**: Log all admin actions for audit trail
7. **Rate Limiting**: Implement rate limiting to prevent abuse
8. **CORS**: Configure CORS to allow requests from the frontend domain
9. **Database Transactions**: Use transactions for operations that modify multiple tables
10. **Notifications**: Trigger real-time notifications when relevant events occur

---

## Testing Recommendations

1. Test all endpoints with valid admin authentication
2. Test unauthorized access (401) and forbidden access (403)
3. Test pagination with various page sizes
4. Test filtering and sorting parameters
5. Test file upload size limits and formats
6. Test concurrent requests for status updates
7. Test error handling for invalid data
8. Load test endpoints that return large datasets

---

## Version History

- **v1.0** (2025-01-04): Initial API documentation for admin dashboard
