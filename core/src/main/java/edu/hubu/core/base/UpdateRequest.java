package edu.hubu.core.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("修改")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateRequest<T extends BaseModel, Q extends BaseQuery> {
    private T update;
    private Q where;
}
