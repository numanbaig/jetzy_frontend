import { Search } from "lucide-react";


interface DashboardPageHeaderProps {
  title: string;
}

export default function DashboardPageHeader({ title }: DashboardPageHeaderProps): React.JSX.Element {

  return (
    <header className="flex flex-col sm:flex-row items-stretch sm:items-center w-full px-4 py-3 border-b bg-white gap-3">
      <div className="min-w-[120px] max-w-[200px] sm:max-w-none">
        <h1 className="text-lg font-bold truncate">{title}</h1>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 min-w-0">
        <div className="relative flex-1 min-w-[150px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <div className="flex gap-2 flex-wrap">
        </div>
      </div>
      <div className="sm:ml-auto">
      </div>
    </header>
  );
}