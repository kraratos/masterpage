
import { Component } from "ag-grid-community"
/***
 * Elemenet of  mapping widgets by id to The corresponing Component class 
 */
export interface WidgetCompoenent{
    /**
     * widget id
     */
    id:number 
    /**
     * Corresponding Componenet Class
     */
    component:any
}