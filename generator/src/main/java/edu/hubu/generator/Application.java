package edu.hubu.generator;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.hubu.generator.define.Field;
import edu.hubu.generator.define.Model;
import edu.hubu.generator.method.*;
import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class Application {

    private static Map<String, Model> getModelMap(String module) {
        Map<String, Model> map = new HashMap<>();
        if (!module.equals("core")) {
            map = getModelMap("core");
            map.forEach((name, model) -> {
                for (Field field : model.getFields()) {
                    field.setInherit(true);
                }
                model.setInherit(true);
            });
        }
        try {
            File path = new File("../" + module + "/define/");
            if (path.exists()) {
                ObjectMapper mapper = new ObjectMapper();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/model").mkdir();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/dao").mkdir();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/controller").mkdir();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/request").mkdir();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/request/query").mkdir();
                new File("../" + module + "/src/main/java/edu/hubu/" + module + "/request/builder").mkdir();
                new File("../web/src/page/main/base").mkdir();
                File[] fileArray = path.listFiles();
                assert fileArray != null;
                for (File file : fileArray) {
                    if (file.getName().endsWith(".json")) {
                        String fileName = file.getName();
                        String modelName = fileName.substring(0, fileName.length() - 5);
                        Model model = mapper.readValue(file, Model.class);
                        model.setName(modelName);
                        if (map.containsKey(modelName)) {
                            for (Field field : model.getFields()) {
                                map.get(modelName).getFields().add(field);
                            }
                        } else {
                            map.put(modelName, model);
                            String folderName = new UnderScoreCaseMethod().exec(modelName).toString();
                            new File("../web/src/pages/main/base" + folderName + "/index.d.ts").mkdir();
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    /**
     * usage: gradle :generator:bootRun --args='MODULE_NAME'
     */
    public static void main(String[] args) {
        String module = args[0];
        try {
            System.out.println(new File("").getAbsolutePath());
            Configuration configuration = new Configuration(Configuration.DEFAULT_INCOMPATIBLE_IMPROVEMENTS);
            configuration.setDirectoryForTemplateLoading(new File("templates/"));
            Map<String, Object> map = new HashMap<>();
            map.put("module", module);
            map.put("c", new CamelCaseMethod());
            map.put("u", new UnderScoreCaseMethod());
            map.put("h", new HyphenCaseMethod());
            map.put("jt", new JavaTypeMethod());
            map.put("st", new ScriptTypeMethod());
            map.put("mt", new MethodTypeMethod());
            map.put("qt", new QueryTypeMethod());
            Map<String, Model> modelMap = getModelMap(module);
            modelMap.forEach((modelName, model) -> {
                try {
                    map.put("model", model);
                    System.out.println("generate model " + modelName);
                    Template template = configuration.getTemplate("java/model.ftl", "UTF-8");
                    File docFile = new File("../" + module + "/src/main/java/edu/hubu/" + module + "/model/" + modelName + ".java");
                    Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("java/dao.ftl", "UTF-8");
                    docFile = new File("../" + module + "/src/main/java/edu/hubu/" + module + "/dao/" + modelName + "MongoDao.java");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("java/controller.ftl", "UTF-8");
                    docFile = new File("../" + module + "/src/main/java/edu/hubu/" + module + "/controller/" + modelName + "Controller.java");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("java/request_query.ftl", "UTF-8");
                    docFile = new File("../" + module + "/src/main/java/edu/hubu/" + module + "/request/query/" + modelName + "Query.java");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("java/request_builder.ftl", "UTF-8");
                    docFile = new File("../" + module + "/src/main/java/edu/hubu/" + module + "/request/builder/" + modelName + "Builder.java");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    String folderName = new UnderScoreCaseMethod().exec(modelName).toString();
                    new File("../web/src/pages/main/base/" + folderName).mkdir();
                    template = configuration.getTemplate("js/index.ftl", "UTF-8");
                    docFile = new File("../web/src/pages/main/base/" + folderName + "/index.d.ts");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("js/columns.ftl", "UTF-8");
                    docFile = new File("../web/src/pages/main/base/" + folderName + "/columns.tsx");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("js/columns.ftl", "UTF-8");
                    docFile = new File("../web/src/pages/main/base/" + folderName + "/columns.tsx");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("js/layout.ftl", "UTF-8");
                    docFile = new File("../web/src/pages/main/base/" + folderName + "/layout.tsx");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                    template = configuration.getTemplate("js/table.ftl", "UTF-8");
                    docFile = new File("../web/src/pages/main/base/" + folderName + "/table.tsx");
                    out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(docFile), StandardCharsets.UTF_8));
                    template.process(map, out);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
