package edu.hubu.core.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.core.type.filter.TypeFilter;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Slf4j
public class ScanFilter implements TypeFilter {

    private final Set<String> BeanSet = new HashSet<>();

    @Override
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
        String className = annotationMetadata.getClassName();
        if (className.endsWith("Controller")) {
            className = className.substring(className.indexOf(".", 9) + 1);
            if (BeanSet.contains(className)) {
                log.info("exclude " + className);
                return true;
            }
            BeanSet.add(className);
        }
        return false;
    }
}
