import React, { useRef, useEffect } from "react";
import {
  Page,
  zmp,
  Button,
  Navbar,
  App,
  View,
  Box,
  Card,
} from "zmp-framework/react";

export default () => {
  const verticalButtonsDialog = useRef(null);
  const twoButtonsDialog = useRef(null);
  const dialog = useRef(null);

  useEffect(() => {
    verticalButtonsDialog.current = zmp.dialog.create({
      title: "Popup Title",
      content:
        '<div class="dialog-text">The content of the pop-up window informs you of the current status, information and solutions</div>',
      buttons: [
        {
          text: "Choice Action",
        },
        {
          text: "Choice Action",
        },
      ],
      verticalButtons: true,
    });

    twoButtonsDialog.current = zmp.dialog.create({
      title: "Popup Title",
      closeByBackdropClick: true,
      destroyOnClose: true,
      content:
        "The content of the pop-up window informs you of the current status, information and solutions",
      on: {
        closed() {
          twoButtonsDialog.current = null;
        },
      },
      buttons: [
        {
          text: "Negative Action",
          cssClass: "dialog-negative-action",
          close: true,
        },
        {
          text: "Main Action",
          close: false,
          onClick() {
            console.log("main actions");
          },
        },
      ],
    });

    dialog.current = zmp.dialog.create({
      title: "Popup Title",
      content:
        '<div class="dialog-text">The content of the pop-up window informs you of the current status, information and solutions</div>',
      buttons: [
        {
          text: "Main Action",
        },
      ],
    });
  }, []);

  const openVerticalButtons = () => {
    if (verticalButtonsDialog.current) {
      // verticalButtonsDialog.current.open();
    }
  };

  const openDialogTwoButtons = () => {
    if (!twoButtonsDialog.current) {
      twoButtonsDialog.current = zmp.dialog.create({
        title: "Popup Title",
        closeByBackdropClick: true,
        destroyOnClose: true,
        content:
          "The content of the pop-up window informs you of the current status, information and solutions",
        on: {
          closed() {
            twoButtonsDialog.current = null;
          },
        },
        buttons: [
          {
            text: "Negative Action",
            cssClass: "dialog-negative-action",
            close: true,
          },
          {
            text: "Main Action",
            close: false,
            onClick() {
              console.log("main actions");
            },
          },
        ],
      });
    }
    // twoButtonsDialog.current.open();
  };

  const openDialog = () => {
    if (dialog.current) {
      dialog.current.open();
    }
  };

  return (
    <Page className="dialog-page">
      <Box>
        <Card inset title="Dialog popup">
          <Box>
            <Button typeName="secondary" onClick={openDialogTwoButtons} fill>
              Popup CTA Horizontal
            </Button>
          </Box>
          <Box>
            <Button typeName="secondary" onClick={openVerticalButtons} fill>
              Popup CTA Verticle
            </Button>
          </Box>
          <Box>
            <Button typeName="secondary" onClick={openDialog} fill>
              Popup 1 CTA
            </Button>
          </Box>
        </Card>
      </Box>
    </Page>
  );
};
