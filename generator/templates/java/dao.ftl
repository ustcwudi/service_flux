package edu.hubu.${module}.dao;

import org.springframework.stereotype.Repository;

import edu.hubu.core.base.BaseMongoDao;
import org.springframework.beans.factory.annotation.Autowired;
import edu.hubu.${module}.model.*;
import edu.hubu.${module}.request.query.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
@Repository("${module}.${model.name}MongoDao")
public class ${model.name}MongoDao extends BaseMongoDao<${model.name}, ${model.name}Query> {

    @Override
    public Flux<${model.name}> importMatrix(List<List<String>> matrix) {
        var modelList = new ArrayList<${model.name}>();
        List<String> header = null;
        for (List<String> line : matrix) {
            if (header == null) {
                header = line;
                continue;
            }
            var model = new ${model.name}();
            for (int i = 0; i < header.size(); i++) {
                var span = line.get(i);
                switch (header.get(i)) {
                    case "id":
                        model.setId(span);
                        break;
                    <#list model.fields as field>
                    case "${u(field.name)}":
                    case "${field.description}":
                    <#if field.type == "id" ||  field.type == "string" ||  field.type == "upload">
                        model.set${field.name}(span);
                    <#elseif field.type == "id[]" ||  field.type == "string[]" ||  field.type == "upload[]">
                        model.set${field.name}(List.of(span.split(";")));
                    <#elseif field.type == "bool">
                        model.set${field.name}(Boolean.getBoolean(span));
                    <#elseif field.type == "int[]">
                        model.set${field.name}(span.split(";").stream().map(Integer::parseInt).collect(Collectors.toList()));
                    <#elseif field.type == "float[]">
                        model.set${field.name}(span.split(";").stream().map(Float::parseFloat).collect(Collectors.toList()));
                    <#elseif field.type == "map[string]string">
                        Map<String, String> map = new HashMap<>();
                        var pairs = span.split(";");
                        for (var pair : pairs) {
                            var array = pair.split(":");
                            map.put(array[0], array[1]);
                        }
                        model.set${field.name}(map);
                    <#elseif field.type == "map[string]string[]">
                        Map<String, String> map = new HashMap<>();
                        var pairs = span.split(";");
                        for (var pair : pairs) {
                            var array = pair.split(":");
                            map.put(array[0], array[1].split("|"));
                        }
                        model.set${field.name}(map);
                    <#elseif field.type == "map[string]int">
                        Map<String, Integer> map = new HashMap<>();
                        var pairs = span.split(";");
                        for (var pair : pairs) {
                            var array = pair.split(":");
                            map.put(array[0], Integer.parseInt(array[1]));
                        }
                        model.set${field.name}(map);
                    <#elseif field.type == "map[string]float">
                        Map<String, Integer> map = new HashMap<>();
                        var pairs = span.split(";");
                        for (var pair : pairs) {
                            var array = pair.split(":");
                            map.put(array[0], Float.parseFloat(array[1]));
                        }
                        model.set${field.name}(map);
                    </#if>
                        break;
                    </#list>
                }
            }
            modelList.add(model);
        }
        return add(modelList);
    }

    @Override
    public Mono<List<${model.name}>> link(String link, Mono<List<${model.name}>> list) {
        switch (link) {
            <#list model.fields as field><#if field.link??>
            case "${u(field.name)}":
                list = link${field.name}(list);
                break;
            </#if></#list>
        }
        return list;
    }
    <#list model.fields as field>
    <#if field.link??>
    <#if field.link != model.name>

    @Autowired
    protected BaseMongoDao<${field.link}, ${field.link}Query> ${c(field.name)}MongoDao;
    </#if>

    protected Mono<List<${model.name}>> link${field.name}(Mono<List<${model.name}>> list) {
        return list.flatMap(data -> {
            Set<String> set = new HashSet<>();
            for (${model.name} item : data) {
                <#if field.type == "id">
                String id = item.get${field.name}();
                if (id != null)
                    set.add(id);
                <#elseif field.type == "id[]">
                List<String> ids = item.get${field.name}();
                if (ids != null)
                    set.addAll(ids);
                </#if>
            }
            if (set.size() > 0) {
                var array = <#if field.link != model.name>${c(field.name)}MongoDao.</#if>find(set, new String[0]);
                return array.map(link -> {
                    for (${model.name} item : data) {
                        if (item.get${field.name}() != null) {
                            <#if field.type == "id">
                            item.set${field.name}Data(link.stream().filter(i -> i.getId().equals(item.get${field.name}())).findAny().orElse(null));
                            <#else>
                            item.set${field.name}Data(new ArrayList<>());
                            item.get${field.name}().forEach(id -> {
                                link.stream().filter(i -> i.getId().equals(id)).findAny().ifPresent(item.get${field.name}Data()::add);
                            });
                            </#if>
                        }
                    }
                    return data;
                });
            }
            return Mono.just(data);
        });
    }
    </#if>
    </#list>
}