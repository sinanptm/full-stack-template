import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Footer = () => {
    return (
        <Card className="mt-8">
            <CardContent className="text-center py-6 md:py-8">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">🎯 Ready to build your next project?</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto">
                    This template provides everything you need to start building production-ready applications
                    with clean architecture that scales with your requirements.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    <Badge variant="secondary" className="text-xs md:text-sm">Built with modern technologies</Badge>
                    <Badge variant="secondary" className="text-xs md:text-sm">Easy to customize</Badge>
                    <Badge variant="secondary" className="text-xs md:text-sm">Production-ready</Badge>
                </div>
            </CardContent>
        </Card>
    );
};
