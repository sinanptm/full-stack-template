import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testing = () => {
    return (
        <Card>
            <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">🧪 Testing Strategy</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Comprehensive test suite with mocked dependencies for isolated unit testing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-sm md:text-base">Test Coverage</h4>
                        <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                            <li>• Authentication use cases</li>
                            <li>• Password reset flows</li>
                            <li>• OAuth integration</li>
                            <li>• OTP verification</li>
                            <li>• Error handling</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm md:text-base">Mock Strategy</h4>
                        <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                            <li>• Repository mocks</li>
                            <li>• Service mocks</li>
                            <li>• External API mocks</li>
                            <li>• Database mocks</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default Testing;
