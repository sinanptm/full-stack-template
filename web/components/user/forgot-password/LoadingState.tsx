import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardContent className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Validating reset link...</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default memo(LoadingState);
