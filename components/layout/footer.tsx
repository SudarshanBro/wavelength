import Link from 'next/link';
import { Radio } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Radio className="h-6 w-6 text-primary" />
            <span className="font-bold">Wavelength</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Discover, share, and engage with your favorite podcasts.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/press" className="text-muted-foreground hover:text-foreground">
                Press
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/for-creators" className="text-muted-foreground hover:text-foreground">
                For Creators
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/community" className="text-muted-foreground hover:text-foreground">
                Community
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wavelength. All rights reserved.
        </p>
      </div>
    </footer>
  );
}