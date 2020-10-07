import React from "react";

export default function ListTable(props) {
  const { columns, data, showHeader, scroll } = props;
  if (scroll) return <ScrollListTable {...props}></ScrollListTable>;
}

export function ScrollListTable(props) {
  const {
    data,
    columns,
    scroll,
    showHeader,
    showOrder,
    rowCls,
    onRowClick,
  } = props;
  return (
    <div className="view-list-table">
      <div className="table">
        {showHeader && (
          <div className="thead">
            <div className="tr">
              {showOrder && <div className="th order-cell"></div>}
              {columns.map((c) => (
                <div key={c.key} className={`th ${c.cls || `${c.key}-cell`}`}>
                  {c.title}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="tbody"></div>
      </div>
    </div>
  );
}
