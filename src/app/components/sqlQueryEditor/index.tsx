"use client";
import { Button, Tabs } from "@mantine/core";

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

export const CustomSqlQueryEditor = () => {
  const [displaySql, setDisplaySql] = useState("Select * from customer");
  const [, setCopyTips] = useState("");
  const [isSqlValid, setIsSqlValid] = useState<boolean>(false);
  /* eslint-disable   @typescript-eslint/no-explicit-any */
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>([]);

  const executeSqlQuery = () => {
    if (!displaySql) {
      return alert("Please write some SQL statements");
    }
    if (!isSqlValid) {
      return alert("SQL statements has syntax errors");
    }
    const res = splitTheString(displaySql);
    // console.log("##executed-queries: ", res);
    alert(
      `Successfully executed the below queries!\n` +
        res.map((q) => " - " + q).join("\n"),
    );
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
    </div>
  );
};
