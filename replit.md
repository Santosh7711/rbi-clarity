# RBI Compliance Portal

## Overview

The RBI Compliance Portal is a comprehensive banking regulatory reporting and audit system designed for Urban Cooperative Banks (UCBs) and other financial institutions. The application facilitates the generation, validation, management, and submission of regulatory reports to the Reserve Bank of India (RBI), including Off-Site Surveillance (OSS) returns, financial disclosures, statutory reports, and compliance documentation. The system provides automated workflows, approval mechanisms, audit trails, and data export capabilities to ensure regulatory compliance and streamline reporting processes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built as a Single Page Application (SPA) using React 18 with TypeScript, providing a modern and responsive user interface. The frontend utilizes Vite as the build tool for fast development and optimized production builds. The component architecture follows a modular design pattern with reusable UI components built on top of Radix UI primitives and styled with Tailwind CSS. The application implements client-side routing using React Router for seamless navigation between different modules.

### UI Design System
The interface employs a professional banking design system with HSL color values specifically chosen for RBI compliance applications. The design uses shadcn/ui components for consistency and accessibility, with a comprehensive set of form controls, data tables, dialogs, and navigation elements. The color scheme follows banking industry standards with professional blue tones and status-specific colors for different report states.

### State Management
The application uses TanStack Query (React Query) for server state management, providing caching, synchronization, and background updates for API data. Local component state is managed using React's built-in useState and useContext hooks. Form state is handled through react-hook-form with Zod validation for type-safe form processing.

### Report Management System
The core functionality revolves around a comprehensive report catalog containing 175+ UCB reports across multiple categories including OSS-DSB series, compliance reports, financial statements, and regulatory submissions. The system includes a dynamic report builder that allows users to create custom report templates with various field types (text, number, currency, date, dropdown, checkbox, textarea, data tables). Reports support automated validation, approval workflows, and scheduled generation.

### Module Structure
The application is organized into distinct modules:
- **Dashboard**: Executive summary with key metrics, pending approvals, and compliance scores
- **Reports**: Report catalog, template management, and report generation
- **Report Builder**: Dynamic form creation with drag-and-drop interface
- **Approvals**: Multi-level approval workflows with status tracking
- **Audit Trail**: Comprehensive logging of all system activities and changes
- **Exports**: Data export functionality with multiple format support
- **Schedule**: Automated report generation and submission scheduling
- **User Management**: Role-based access control and user administration

### Authentication and Authorization
The system implements role-based access control with different user levels including Bank Officers, Senior Officers, Managers, and System Administrators. Each role has specific permissions for report access, approval limits, and system functionality. The UI dynamically adjusts based on user roles and permissions.

### Data Architecture
The application handles complex financial data structures including deposit accounts, loans and advances, profit and loss statements, balance sheets, investment portfolios, and regulatory metrics. Data is organized by branches, time periods, and report categories to support both individual bank and consolidated reporting requirements.

## External Dependencies

### UI and Styling Libraries
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives including dialogs, dropdowns, accordions, and form controls
- **Tailwind CSS**: Utility-first CSS framework for responsive design and consistent styling
- **Lucide React**: Icon library providing banking and financial industry appropriate icons
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for constructing className strings conditionally

### Form and Data Management
- **React Hook Form**: Forms library with validation and type safety
- **@hookform/resolvers**: Validation resolver for various schema validation libraries
- **TanStack Query**: Data synchronization and caching library for server state management
- **date-fns**: Date manipulation library for handling report periods and scheduling
- **input-otp**: OTP input component for secure authentication flows

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Component Libraries
- **next-themes**: Theme management for light/dark mode support
- **react-day-picker**: Calendar component for date selection in reports
- **embla-carousel-react**: Carousel component for dashboard widgets
- **cmdk**: Command palette component for quick navigation

### Future Integration Points
The application architecture supports integration with:
- **Database Systems**: Prepared for PostgreSQL integration for production data storage
- **RBI APIs**: Ready for direct submission to RBI systems
- **Banking Core Systems**: APIs for real-time data synchronization
- **Document Management**: Integration with document storage systems
- **Email Services**: Automated notifications and report delivery
- **Authentication Providers**: Enterprise SSO and identity management systems