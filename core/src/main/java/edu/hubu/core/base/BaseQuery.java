package edu.hubu.core.base;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public abstract class BaseQuery {

    private List<String> id;

    /**
     * 创建时间
     */
    private List<Date> createTime;

    /**
     * 修改时间
     */
    private List<Date> updateTime;

    /**
     * 删除时间
     */
    private List<Date> deleteTime;

    /**
     * 是否删除
     */
    private Boolean trash;
}
