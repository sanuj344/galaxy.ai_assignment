import WorkflowCanvas from "@/components/WorkflowCanvas";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function DashboardPage() {
    return (
        <div className="flex h-full">
            <LeftSidebar />
            <div className="flex-1">
                <WorkflowCanvas />
            </div>
            <RightSidebar />
        </div>
    );
}
