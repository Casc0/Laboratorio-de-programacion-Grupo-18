## Executor


Un objeto que ejecuta tareas de tipo Runnable que recibe como parametro. Normalmente se utiliza para no crear hilos explicitamente. Leer más en:

```
Executor executor = anExecutor;
 executor.execute(new RunnableTask1());

class DirectExecutor implements Executor {
   public void execute(Runnable r) {
     r.run();
   }
 }
```

## Executor Service

Un Executor que provee metodos para manejar la terminación y metodos que producen un objeto Future para hacer un seguimiento del progreso de una o más tareas asincronicas.

Se puede hacer un "shutdown" para que se rechacen nuevas tareas. shutdown() permite que sigan entrando nuevas tareas y shutdownNow() previene la ejecución de tareas que esten esperando su arranque e intenta parar tareas que esten siendo ejecutadas. Un ExecutorService sin usar necesita ser dado de baja para liberar recursos.

## Scheduled Executor Service

Un ExecutorService que puede planificar comandos a ejecutar despues de un delay o cada cierto período.

El metodo schedule() crea tareas con dealys varios y retorna un objeto que puede ser utilizado para cancelar o verificar la ejecución. También existen scheduleAtFixedRate() y scheduleWithFixedDelay() que crean y ejecutan tareas cada cierto tiempo fijo.

Si se usa el metodo execute() del Executor o un ExecutorService habra un delay de 0. 0 y numeros negativos marcan tareas que necesitan ser ejecutadas inmediatamente.

Ejemplo donde se beepea cada diez segundos por una hora:

```
import static java.util.concurrent.TimeUnit.*;
 class BeeperControl {
   private final ScheduledExecutorService scheduler =
     Executors.newScheduledThreadPool(1);

   public void beepForAnHour() {
     final Runnable beeper = new Runnable() {
       public void run() { System.out.println("beep"); }
     };
     final ScheduledFuture<?> beeperHandle =
       scheduler.scheduleAtFixedRate(beeper, 10, 10, SECONDS);
     scheduler.schedule(new Runnable() {
       public void run() { beeperHandle.cancel(true); }
     }, 60 * 60, SECONDS);
   }
 }
```
