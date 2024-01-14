export const langs = () => {
    return {
        "en-gb":{
            "columns":{
                "name":"Nombre", //replace the title of column name with the value "Name"
            },
            "data":{
                "loading":"Cargando", //data loader text
                "error":"Error", //data error text
            },
            "groups":{ //copy for the auto generated item count in group header
                "item":"item", //the singular  for item
                "items":"items", //the plural for items
            },
            "pagination":{
            	"page_size":"Tamano", //label for the page size select element
                "page_title":"Ver pagina",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                "first":"Primero", //text for the first page button
                "first_title":"Primera pagina", //tooltip text for the first page button
                "last":"ultimo",
                "last_title":"Last Page",
                "prev":"anterior",
                "prev_title":"Prev Page",
                "next":"siguiente",
                "next_title":"Next Page",
                "all":"todos",
                "counter":{
                    "showing": "Showing",
                    "of": "of",
                    "rows": "rows",
                    "pages": "pages",
                }
            },
            "headerFilters":{
                "default":"filter column...", //default header filter placeholder text
                "columns":{
                    "name":"filter name...", //replace default header filter text for column name
                }
            }
        }
    }
  };