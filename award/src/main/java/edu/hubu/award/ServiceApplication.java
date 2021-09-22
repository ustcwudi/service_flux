package edu.hubu.award;

import edu.hubu.core.filter.ScanFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@ComponentScan(value = "edu.hubu", excludeFilters = @ComponentScan.Filter(type = FilterType.CUSTOM, value = {ScanFilter.class}))
public class ServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceApplication.class, args);
    }
}
