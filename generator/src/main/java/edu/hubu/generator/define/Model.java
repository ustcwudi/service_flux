package edu.hubu.generator.define;

import lombok.Data;

import java.util.Collection;

@Data
public class Model {

    /**
     * 名称
     */
    private String name;

    /**
     * 说明
     */
    private String description;

    /**
     * 是否继承
     */
    private boolean inherit;

    /**
     * 字段
     */
    private Collection<Field> fields;
}
