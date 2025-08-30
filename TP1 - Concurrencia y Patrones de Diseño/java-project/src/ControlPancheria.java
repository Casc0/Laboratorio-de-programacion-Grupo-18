import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import static java.util.concurrent.TimeUnit.*;



public class ControlPancheria {
    //Simula comienzo y fin de produccion de panchitos
    //Se mantiene una cola de clientes 

    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(1);

    public void iniciarVentas() {
        
        BlockingQueue<String> colaClientes = new LinkedBlockingQueue<>(); //Tamaño ilimitado, segura para hilos

        for(int i = 0; i<=10; i++) {
            colaClientes.add("Cliente NUM _ "+ (i+1));
        }

        final Runnable panchero = new Panchero(colaClientes);

        final ScheduledFuture<?> pancheroHandler =
                scheduler.scheduleWithFixedDelay(panchero, 0, 3, SECONDS); //Se hacen panchos cada 3 segundos 

        scheduler.schedule(new Runnable() {
            public void run() { 
                pancheroHandler.cancel(true);
                System.out.println("Pancheria cerrada");
                scheduler.shutdown();
            }
        }, 30, SECONDS); //Luego de 30 seg se cancela el trabajo del panchero
    }

}
