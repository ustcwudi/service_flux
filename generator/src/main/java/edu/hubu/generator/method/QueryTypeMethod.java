package edu.hubu.generator.method;

import edu.hubu.generator.define.SearchType;
import freemarker.ext.beans.StringModel;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;

import java.util.List;

public class QueryTypeMethod implements TemplateMethodModelEx {

    private String toJavaScriptType(String type) {
        switch (type) {
            case "Boolean":
                return "boolean";
            case "Integer":
            case "Float":
                return "number";
            case "List<Integer>":
            case "List<Float>":
                return "number[]";
            case "List<String>":
                return "string[]";
            case "String":
                return "string";
            case "Map<String, String>":
                return "{ [key: string]: string }";
            case "Map<String, Integer>":
            case "Map<String, Float>":
                return "{ [key: string]: number }";
            case "Map<String, List<Integer>>":
            case "Map<String, List<Float>>":
                return "{ [key: string]: number[] }";
        }
        return "";
    }

    @Override
    public Object exec(List arguments) {
        String str = ((SimpleScalar) arguments.get(0)).getAsString();
        if (arguments.size() > 2) {
            Object type = exec(List.of(arguments.get(0), arguments.get(1)));
            return toJavaScriptType(type.toString());
        }
        if (arguments.get(1) != null) {
            SearchType type = SearchType.valueOf(((StringModel) arguments.get(1)).getAsString());
            switch (type) {
                case equal:
                    switch (str) {
                        case "int":
                            return "Integer";
                        case "float":
                            return "Float";
                        case "bool":
                            return "Boolean";
                        case "int[]":
                            return "List<Integer>";
                        case "float[]":
                            return "List<Float>";
                        case "string":
                        case "id":
                            return "String";
                        case "string[]":
                        case "id[]":
                            return "List<String>";
                        case "map[string]string":
                        case "map[string]string[]":
                            return "Map<String, String>";
                        case "map[string]int":
                            return "Map<String, Integer>";
                        case "map[string]float":
                            return "Map<String, Float>";
                        default:
                            return "";
                    }
                case like:
                    switch (str) {
                        case "string":
                        case "string[]":
                            return "String";
                        case "map[string]string":
                        case "map[string]string[]":
                            return "Map<String, String>";
                        default:
                            return "";
                    }
                case in:
                    switch (str) {
                        case "int":
                        case "int[]":
                            return "List<Integer>";
                        case "float":
                        case "float[]":
                            return "List<Float>";
                        case "string":
                        case "id":
                        case "string[]":
                        case "id[]":
                            return "List<String>";
                        case "map[string]int":
                            return "Map<String, List<Integer>>";
                        case "map[string]float":
                            return "Map<String, List<Float>>";
                        default:
                            return "";
                    }
                case between:
                    switch (str) {
                        case "int":
                        case "int[]":
                            return "List<Integer>";
                        case "float":
                        case "float[]":
                            return "List<Float>";
                        case "map[string]int":
                            return "Map<String, List<Integer>>";
                        case "map[string]float":
                            return "Map<String, List<Float>>";
                        default:
                            return "";
                    }
            }
        }
        return "";
    }
}
