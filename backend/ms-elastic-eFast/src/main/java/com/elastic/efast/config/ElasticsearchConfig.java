package com.elastic.efast.config;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
//import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
//import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

//import io.swagger.v3.oas.models.OpenAPI;
//import io.swagger.v3.oas.models.info.Info;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.elastic.efast.repository") //"com.unir.products.data"
public class ElasticsearchConfig /* <version>5.2.3  extends ElasticsearchConfiguration   */ {

	
  @Value("${elasticsearch.valHttp}")
  private String valHttp;
  @Value("${elasticsearch.host}")
  private String clusterEndpoint; //="localhost";
  @Value("${elasticsearch.port}")
  private int clusterPort;  
  @Value("${elasticsearch.credentials.user}")
  private String username; //="elastic";
  @Value("${elasticsearch.credentials.password}")
  private String password; //="";

  @Bean
  public ElasticsearchOperations elasticsearchTemplate() {

    final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
    credentialsProvider.setCredentials(AuthScope.ANY,
        new UsernamePasswordCredentials(username, password));
  				
    return new ElasticsearchRestTemplate(  									//OK docker clusterPort en localhost:  9200, "http"
        new RestHighLevelClient(RestClient.builder(new HttpHost(clusterEndpoint, clusterPort, valHttp)) //bonsai: 443, "https" 
            .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
              @Override
              public HttpAsyncClientBuilder customizeHttpClient(
                  HttpAsyncClientBuilder httpClientBuilder) {
                return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
              }
            })));
	  
	 
  }

//  @Override
//	public ClientConfiguration clientConfiguration() {
//		return ClientConfiguration.builder() //
//				.connectedTo("localhost:9200") //
//				.build();
//	}
  
  
//  aja swagger openapi
//@Bean
//public OpenAPI customOpenApi() {
//	var info = new Info().title("Practical Java API").description("Open API documentation auto-generated from Spring")
//			.version("3.0.0");
//
//	return new OpenAPI().info(info);
//}
}
