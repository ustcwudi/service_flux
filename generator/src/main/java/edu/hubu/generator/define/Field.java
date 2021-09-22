package edu.hubu.generator.define;

import lombok.Data;

import java.util.Map;

@Data
public class Field {
    String name;
    String type;
    String description;
    boolean nullable;
    String link;
    SearchType search;
    Map<String, String> map;
    Rule rule;
    boolean inherit;
}
