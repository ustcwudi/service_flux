package edu.hubu.generator.define;

import java.util.Collection;

import lombok.Data;

@Data
public class Rule {
    private Collection<String> ext;
    private Integer size;
}
