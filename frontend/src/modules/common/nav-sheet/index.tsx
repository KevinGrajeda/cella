import { useRef } from 'react';
import { useBreakpoints } from '~/hooks/use-breakpoints';
import { useKeyPress } from '~/hooks/use-key-press';
import { ScrollArea } from '~/modules/ui/scroll-area';
import { Sheet, SheetContent } from '~/modules/ui/sheet';
import { useNavigationStore } from '~/store/navigation';

const NavSheet = () => {
  const isMobile = useBreakpoints('max', 'sm');
  const { activeSheet, setSheet, keepMenuOpen } = useNavigationStore();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onKeyPress = () => {
    const isFocusedWithin = containerRef?.current?.contains(document.activeElement as Node);
    if (isFocusedWithin && activeSheet) setSheet(null);
  };

  useKeyPress('Escape', onKeyPress);

  const isMirrorSide = activeSheet?.mirrorOnMobile;
  const hideShadow = keepMenuOpen && activeSheet?.id === 'menu';
  const sheetClass = `${
    hideShadow ? 'lg:shadow-none' : ''
  } top-16 h-[calc(100%-16)] duration-300 ease-in-out p-0 md:left-16 md:top-0 z-30 data-[state=closed]:duration-300 data-[state=open]:duration-300`;

  return (
    <Sheet open={!!activeSheet} modal={false}>
      {isMobile && !!activeSheet && (
        <div
          onClick={() => setSheet(null)}
          onKeyDown={() => {}}
          className="fixed inset-0 z-30 bg-background/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
      )}
      <SheetContent side={isMirrorSide ? 'mirrorOnMobile' : 'left'} ref={containerRef} className={sheetClass} onClick={() => setSheet(null)}>
        <ScrollArea className="h-full" id="nav-sheet">
          <div className="p-4">{activeSheet?.sheet}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export { NavSheet };
