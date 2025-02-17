export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    email_verified_at: string;
}

export interface Project {
    id: number | string | undefined;
    name: string;
    description: string;
    due_date: string;
    status: Status;
    image_path: string;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: number;
    name: string;
    description: string;
    image_path: string;
    status: Status;
    priority: Priority;
    due_date: string;
    assigned_user: User;
    created_by: User;
    updated_by: User;
    project: Project;
    created_at: string;
    updated_at: string;
}

type Status = "pending" | "in_progress" | "completed";
type Priority = "low" | "medium" | "high";

export type meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: [{ url: string; label: string; active: boolean }];
    path: string;
    per_page: number;
    to: number;
    total: number;
};

export type links = {
    next?: string;
    prev?: string;
    first?: string;
    last?: string;
};

export interface Projects {
    data: Project[];
    links: links;
    meta: meta;
}

export interface Tasks {
    data: Task[];
    links: links;
    meta: meta;
}

export interface Users {
    data: User[];
    links: links;
    meta: meta;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
