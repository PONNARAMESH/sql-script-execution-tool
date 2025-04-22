"use client";
import { Button, ScrollArea, Table, Tabs } from "@mantine/core";

import {
  SqlEditor,
  copyToClipboard,
  formatSql,
  getValidateSql,
  SqlErrorTypeEnum,
  SqlChangedCallbackData,
} from "react-sql-editor";
import "regenerator-runtime/runtime";
import { useState } from "react";
import { Ace } from "ace-builds";
import { getQueryResult } from "@/services/clientServices";
import { TObject } from "@/lib/types";

export const CustomSqlQueryEditor = () => {
  const [displaySql, setDisplaySql] = useState("Select * from customer");
  const [, setCopyTips] = useState("");
  const [isSqlValid, setIsSqlValid] = useState<boolean>(false);
  /* eslint-disable   @typescript-eslint/no-explicit-any */
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>([]);
  const [queryResult, setQueryResult] = useState<Array<TObject>>([]);

  const executeSqlQuery = () => {
    if (!displaySql) {
      return alert("Please write some SQL statements");
    }
    if (!isSqlValid) {
      return alert("SQL statements has syntax errors");
    }
    const res = splitTheString(displaySql);
    // console.log("##executed-queries: ", res);
    // alert(
    //   `Successfully executed the below queries!\n` +
    //     res.map((q) => " - " + q).join("\n"),
    // );
    getQueryResult(res)
      .then((res) => {
        if (res && Array.isArray(res)) {
          console.log("##res: ", res);
          setQueryResult(res);
        } else {
          setQueryResult([]);
        }
      })
      .catch((error) => {
        console.log("##error: ", error);
      });
  };
  const splitTheString = (input: string, splitChar = ";") => {
    if (!input) return [""];
    return input.split(splitChar);
  };
  const validateSqlSnippets = (data: SqlChangedCallbackData) => {
    const annotations: Ace.Annotation[] = [];
    splitTheString(data?.value || "").forEach(
      (sqlStatement: string, index: number) => {
        const res2 = formatSql({ value: sqlStatement });
        const res = getValidateSql({ value: res2?.value });
        // console.log("##res2: ", res);
        if (
          !res?.isSqlValid &&
          res?.validateSqlResult?.sqlErrorType !==
            SqlErrorTypeEnum?.validateError
        ) {
          annotations.push({
            row: index,
            column: 0,
            type: "error",
            text: res?.validateSqlResult?.message,
          });
        }
        // console.log(`##query-${index} : `, res);
        setAnnotations(annotations);
      },
    );
    setDisplaySql(data.value);
    setIsSqlValid(!!annotations?.length ? false : true);
  };

  function getSelectionText() {
    let text = "";
    const activeEl: any = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

    if (
      activeElTagName == "textarea" ||
      (activeElTagName == "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
        typeof activeEl.selectionStart == "number")
    ) {
      const startIndex = !activeEl.selectionStart
        ? activeEl.selectionStart
        : activeEl.selectionStart - 1;
      text = activeEl.value.slice(startIndex, activeEl.selectionEnd);
    } else if (window.getSelection) {
      text = window?.getSelection()?.toString() || "";
    }

    return text;
  }

  const handleSelect = () => {
    const querySelected = getSelectionText();
    console.log("##onSelection-change: ", querySelected);
  };

  const getDynamicHeaders = (data: TObject) => {
    return Object.keys(data);
  };

  console.log("##queryResult: ", queryResult);
  const headers = getDynamicHeaders(queryResult[0] || {});
  return (
    <div className="SqlQueryEditorContainer">
      <Tabs defaultValue="SQL">
        <Tabs.List>
          <Tabs.Tab value="SQL">SQL</Tabs.Tab>
          {/* <Tabs.Tab value="gallery">
            Add new SQL editor
          </Tabs.Tab> */}
        </Tabs.List>

        <Tabs.Panel value="SQL">
          {/* { SqlEditor is build on top of AceEditor(https://securingsincity.github.io/react-ace/)} */}
          <SqlEditor
            // onSelection={handleSelect}
            onSelectionChange={handleSelect}
            defaultValue={displaySql}
            title="Sql Editor"
            width="auto"
            height="300px"
            // isShowHeader={true}
            mode="mysql"
            theme="kuroir"
            // debounceChangePeriod={1000}
            // readOnly={true}
            minLines={12}
            enableSnippets={true}
            onChange={validateSqlSnippets}
            onClickFormat={() => {
              formatSql({
                value: displaySql,
                callback: (formatData) => {
                  setDisplaySql(formatData.value);
                },
              });
            }}
            onClickDelete={() => {
              setDisplaySql("");
            }}
            onClickCopy={() => {
              copyToClipboard({
                value: displaySql,
                callback: setCopyTips,
              });
            }}
            annotations={annotations}
          />
        </Tabs.Panel>
      </Tabs>
      <div className="buttons" style={{ margin: "2rem 0rem" }}>
        <Button
          variant="filled"
          onClick={executeSqlQuery}
          disabled={!isSqlValid}
        >
          Button
        </Button>
      </div>
      {!!queryResult.length && (
        <ScrollArea
          h={300}
          // onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table miw={700}>
            <Table.Thead
            // className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <Table.Tr>
                {headers.map((name) => {
                  return <Table.Th>{name}</Table.Th>;
                })}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {(queryResult || []).map((obj, key) => {
                return (
                  <Table.Tr key={obj.id}>
                    {headers.map((key) => (
                      <Table.Td>{obj[key] || ""}</Table.Td>
                    ))}
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};
