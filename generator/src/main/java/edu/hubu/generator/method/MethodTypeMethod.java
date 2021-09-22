package edu.hubu.generator.method;

import freemarker.template.SimpleScalar;
import freemarker.template.TemplateMethodModelEx;

import java.util.List;

public class MethodTypeMethod implements TemplateMethodModelEx {

    @Override
    public Object exec(List arguments) {
        String str = ((SimpleScalar) arguments.get(0)).getAsString();
        switch (str) {
            case "int":
                return "Int";
            case "float":
                return "Float";
            case "int[]":
                return "IntArray";
            case "float[]":
                return "FloatArray";
            case "bool":
                return "Bool";
            case "string":
            case "upload":
            case "id":
                return "String";
            case "string[]":
            case "upload[]":
            case "id[]":
                return "StringArray";
            case "map[string]string":
                return "StringMap";
            case "map[string]int":
                return "IntMap";
            case "map[string]float":
                return "FloatMap";
            case "map[string]string[]":
                return "StringArrayMap";
            default:
                return "";
        }
    }
}
