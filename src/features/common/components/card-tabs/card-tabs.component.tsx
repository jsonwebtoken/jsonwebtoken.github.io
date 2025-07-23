import React, { useEffect, useId, useState } from "react";
import styles from "./card-tabs.module.scss";
import {
  CardComponentProps,
  FramelessCardComponent,
} from "@/features/common/components/card/card.component";
import { clsx } from "clsx";
import { MonoFont } from "@/libs/theme/fonts";
import Cookies from "js-cookie";
import {
  DebuggerOutputModalValues,
  useDebuggerStore,
} from "@/features/debugger/services/debugger.store";
import {
  Dialog,
  Heading,
  Key,
  Modal,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "react-aria-components";
import { Spinner } from "../spinner/spinner.component";

type CardTabsProps = {
  resizeId: string;
  languageCode: string;
  title: string | null;
  cards: CardComponentProps[];
  activeTabId: string;
  isLoading?: boolean;
  handleActiveCardChange: (tabId: string) => void;
};

const CardTabs: React.FC<CardTabsProps> = ({
  resizeId,
  title,
  cards,
  isLoading,
  activeTabId,
  handleActiveCardChange,
}) => {
  const tabsId = useId();

  const outputModalState$ = useDebuggerStore(
    (state) => state.outputModalState$
  );
  const outputModalId$ = useDebuggerStore((state) => state.outputModalId$);
  const closeOutputModal$ = useDebuggerStore(
    (state) => state.closeOutputModal$
  );

  const activeCard = cards.filter((card) => card.id === activeTabId)[0];

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        outputModalState$ === DebuggerOutputModalValues.OPEN
      ) {
        closeOutputModal$();
      }
    };

    if (outputModalState$ === DebuggerOutputModalValues.OPEN) {
      window.addEventListener("keydown", handleEsc);
    }

    if (outputModalState$ === DebuggerOutputModalValues.CLOSED) {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeOutputModal$, outputModalState$]);

  if (!activeCard) {
    return null;
  }

  return (
    <>
      <Modal
        isDismissable={true}
        isOpen={
          outputModalState$ === DebuggerOutputModalValues.OPEN &&
          resizeId === outputModalId$
        }
        onOpenChange={() => {
          closeOutputModal$();
        }}
        className={styles.modal}
      >
        <Dialog className={styles.dialog}>
          <div
            role="region"
            aria-labelledby={title ? tabsId : undefined}
            className={styles.cardTabs__container}
          >
            {title && (
              <Heading
                slot="title"
                id={tabsId}
                className={styles.cardTabs__title}
              >
                {title}
              </Heading>
            )}
            <Tabs
              selectedKey={activeCard.id}
              onSelectionChange={(e) => {
                handleActiveCardChange(e.toString());
              }}
              className={clsx(MonoFont.className, styles.cardTabs)}
            >
              <>
                <TabList className={styles.cardTabs__tabList}>
                  {cards.map((props) => {
                    const { title, compactTitle, id } = props;

                    return (
                      <React.Fragment key={title}>
                        <Tab id={id} className={clsx(styles.cardTab__title)}>
                          <span className={styles.cardTab__title__full}>
                            {title}
                          </span>
                          <span className={styles.cardTab__title__compact}>
                            {compactTitle}
                          </span>
                        </Tab>
                      </React.Fragment>
                    );
                  })}
                </TabList>
                {activeCard.slots?.toolbar && (
                  <div className={styles.cardTabs__actionButtons}>
                    {activeCard.slots.toolbar}
                  </div>
                )}
              </>
              {cards.map((card) => {
                return (
                  <TabPanel
                    key={card.id}
                    id={card.id}
                    className={styles.cardTabs__body}
                    data-no-padding={
                      activeCard.options
                        ? activeCard.options.noPadding
                        : undefined
                    }
                  >
                    <FramelessCardComponent
                      {...activeCard}
                      options={{ ...activeCard.options, hideTitle: true }}
                    />
                  </TabPanel>
                );
              })}
            </Tabs>
          </div>
        </Dialog>
      </Modal>
      <div
        role="region"
        aria-labelledby={title ? tabsId : undefined}
        className={styles.cardTabs__container}
      >
        {title && (
          <div className={styles.cardTabs__title__container}>
            <h4 id={tabsId} className={styles.cardTabs__title}>
              {title}
            </h4>
            {isLoading && <Spinner />}
          </div>
        )}
        <Tabs
          selectedKey={activeCard.id}
          onSelectionChange={(e) => {
            handleActiveCardChange(e.toString());
          }}
          className={clsx(MonoFont.className, styles.cardTabs)}
        >
          <>
            <TabList className={styles.cardTabs__tabList}>
              {cards.map((props) => {
                const { title, compactTitle, id } = props;

                return (
                  <React.Fragment key={title}>
                    <Tab id={id} className={clsx(styles.cardTab__title)}>
                      <span className={styles.cardTab__title__full}>
                        {title}
                      </span>
                      <span className={styles.cardTab__title__compact}>
                        {compactTitle}
                      </span>
                    </Tab>
                  </React.Fragment>
                );
              })}
            </TabList>
            {activeCard.slots?.toolbar && (
              <div className={styles.cardTabs__actionButtons}>
                {activeCard.slots.toolbar}
              </div>
            )}
          </>
          {cards.map((card) => {
            return (
              <TabPanel
                key={card.id}
                id={card.id}
                className={styles.cardTabs__body}
                data-no-padding={
                  activeCard.options ? activeCard.options.noPadding : undefined
                }
              >
                <FramelessCardComponent
                  {...activeCard}
                  options={{ ...activeCard.options, hideTitle: true }}
                />
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

type CardTabsComponentProps = {
  resizeId: string;
  languageCode: string;
  title: string | null;
  cards: CardComponentProps[];
};

export const CardTabsComponent: React.FC<CardTabsComponentProps> = ({
  resizeId,
  languageCode,
  title,
  cards,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(cards[0].id);

  const handleActiveCardChange = (key: Key) => {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      if (card.id === key) {
        setActiveTabId(card.id);
      }
    }
  };

  return (
    <CardTabs
      resizeId={resizeId}
      languageCode={languageCode}
      title={title}
      cards={cards}
      activeTabId={activeTabId}
      handleActiveCardChange={handleActiveCardChange}
    />
  );
};

type CardTabsWithTabPersistenceComponentProps = {
  resizeId: string;
  tabPersistenceCookieKey: string | null;
  initialTabId: string;
  languageCode: string;
  title: string | null;
  cards: CardComponentProps[];
  isLoading?: boolean;
  handleTabChange: (key: string) => void;
};

export const CardTabsWithTabPersistenceComponentProps: React.FC<
  CardTabsWithTabPersistenceComponentProps
> = ({
  resizeId,
  tabPersistenceCookieKey,
  initialTabId,
  languageCode,
  title,
  cards,
  isLoading,
  handleTabChange,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(initialTabId);

  const handleActiveCardChange = (tabId: string) => {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      if (card.id === tabId) {
        setActiveTabId(card.id);
      }
    }

    if (tabPersistenceCookieKey) {
      Cookies.set(tabPersistenceCookieKey, tabId.toString(), {
        secure: true,
      });

      handleTabChange(tabId);
    }
  };

  return (
    <CardTabs
      resizeId={resizeId}
      languageCode={languageCode}
      title={title}
      cards={cards}
      isLoading={isLoading}
      activeTabId={activeTabId}
      handleActiveCardChange={handleActiveCardChange}
    />
  );
};
