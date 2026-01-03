import { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte nás s otázkami, návrhmi alebo pripomienkami k aplikácii Radary.SK.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Kontaktujte nás
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Máte otázky, návrhy alebo pripomienky? Radi vám pomôžeme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Pre všeobecné otázky a podporu
                </p>
                <a
                  href="mailto:info@radary.sk"
                  className="text-primary hover:underline font-medium"
                >
                  info@radary.sk
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Spätná väzba
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Nahlásenie chyby alebo návrh na vylepšenie
                </p>
                <a
                  href="mailto:feedback@radary.sk"
                  className="text-primary hover:underline font-medium"
                >
                  feedback@radary.sk
                </a>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Napište nám správu</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meno</label>
                    <Input placeholder="Vaše meno" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="vas@email.sk" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Predmet</label>
                  <Input placeholder="Predmet správy" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Správa</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Vaša správa..."
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Odoslať správu
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 text-center space-y-2">
            <MapPin className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-semibold">Radary.SK</h3>
            <p className="text-sm text-muted-foreground">Slovensko</p>
          </div>
        </div>
      </div>
    </div>
  );
}
