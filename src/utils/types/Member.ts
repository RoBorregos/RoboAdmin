type Member = {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    lastname: string;
    status: string;
    role: string | null;
    subtitle: string | null;
    class: string | null;
    semesters: string | null;
    description: string;
    github: string | null;
    github_user: string | null;
    linkedin: string | null;
    tags: string | null;
}
