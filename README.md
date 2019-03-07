 #   V o x S c r a p e   ( N e w s   S c r a p e r ) 
 
 C o d i n g   B o o t c a m p   -   D a t a   s c r a p i n g   e x e r c i s e   b a s e d   o n   a   n o n - r e l a t i o n a l   d a t a b a s e   t e c h n o l o g y   ( M o n g o D B )   t o   s u c c e s s f u l l y   p u l l   n e w s   a r t i c l e s   f r o m   a   g i v e n   s i t e   a n d   a l l o w   f o r   t h e   s t o r a g e   o f   c u s t o m   n o t e s   a s s o c i a t e d   w i t h   t h o s e   a r t i c l e s .   ( M o n g o D B ,   E x p r e s s ,   N o d e . j s ,   J a v a s c r i p t ,   H T M L ,   C S S ) 
 
 
 
 # # #   O v e r v i e w 
 
 I n   t h i s   a s s i g n m e n t ,   y o u ' l l   c r e a t e   a   w e b   a p p   t h a t   l e t s   u s e r s   v i e w   a n d   l e a v e   c o m m e n t s   o n   t h e   l a t e s t   n e w s .   B u t   y o u ' r e   n o t   g o i n g   t o   a c t u a l l y   w r i t e   a n y   a r t i c l e s ;   i n s t e a d ,   y o u ' l l   f l e x   y o u r   M o n g o o s e   a n d   C h e e r i o   m u s c l e s   t o   s c r a p e   n e w s   f r o m   a n o t h e r   s i t e . 
 
 P u b l i s h e d   s i t e :   [ h t t p s : / / b o n n i e h o - v o x - c o m - s c r a p e r . h e r o k u a p p . c o m / ] ( h t t p s : / / b o n n i e h o - v o x - c o m - s c r a p e r . h e r o k u a p p . c o m / ) 
 
 # # #   B e f o r e   Y o u   B e g i n 
 
 1 .   C r e a t e   a   G i t H u b   r e p o   f o r   t h i s   a s s i g n m e n t   a n d   c l o n e   i t   t o   y o u r   c o m p u t e r .   A n y   n a m e   w i l l   d o   - -   j u s t   m a k e   s u r e   i t ' s   r e l a t e d   t o   t h i s   p r o j e c t   i n   s o m e   f a s h i o n . 
 
 2 .   R u n   ` n p m   i n i t ` .   W h e n   t h a t ' s   f i n i s h e d ,   i n s t a l l   a n d   s a v e   t h e s e   n p m   p a c k a g e s : 
 
 3 .   e x p r e s s 
 
 4 .   e x p r e s s - h a n d l e b a r s 
 
 5 .   m o n g o o s e 
 
 6 .   b o d y - p a r s e r 
 
 7 .   c h e e r i o 
 
 8 .   r e q u e s t 
 
 9 .   * * N O T E * * :   I f   y o u   w a n t   t o   e a r n   c o m p l e t e   c r e d i t   f o r   y o u r   w o r k ,   y o u   m u s t   u s e   a l l   s i x   o f   t h e s e   p a c k a g e s   i n   y o u r   a s s i g n m e n t . 
 
 1 0 .   I n   o r d e r   t o   d e p l o y   y o u r   p r o j e c t   t o   H e r o k u ,   y o u   m u s t   s e t   u p   a n   m L a b   p r o v i s i o n .   m L a b   i s   r e m o t e   M o n g o D B   d a t a b a s e   t h a t   H e r o k u   s u p p o r t s   n a t i v e l y .   F o l l o w   t h e s e   s t e p s   t o   g e t   i t   r u n n i n g : 
 
 1 1 .   C r e a t e   a   H e r o k u   a p p   i n   y o u r   p r o j e c t   d i r e c t o r y . 
 
 1 2 .   R u n   t h i s   c o m m a n d   i n   y o u r   T e r m i n a l / B a s h   w i n d o w : 
 
         *   ` h e r o k u   a d d o n s : c r e a t e   m o n g o l a b ` 
 
         *   T h i s   c o m m a n d   w i l l   a d d   t h e   f r e e   m L a b   p r o v i s i o n   t o   y o u r   p r o j e c t . 
 
 1 3 .   Y o u ' l l   n e e d   t o   f i n d   t h e   U R I   s t r i n g   t h a t   c o n n e c t s   M o n g o o s e   t o   m L a b .   R u n   t h i s   c o m m a n d   t o   g r a b   t h a t   s t r i n g : 
 
         *   ` h e r o k u   c o n f i g   |   g r e p   M O N G O D B _ U R I ` 
 
         *   N o t i c e   t h e   v a l u e   t h a t   a p p e a r s   a f t e r   ` M O N G O D B _ U R I   = > ` .   T h i s   i s   y o u r   U R I   s t r i n g .   C o p y   i t   t o   a   d o c u m e n t   f o r   s a f e k e e p i n g . 
 
 1 4 .   W h e n   y o u  r e   r e a d y   t o   c o n n e c t   M o n g o o s e   w i t h   y o u r   r e m o t e   d a t a b a s e ,   y o u ' l l   n e e d   t o   a d d   i t   a s   a n   [ e n v i r o n m e n t   v a r i a b l e   o n   H e r o k u ] ( h t t p s : / / d e v c e n t e r . h e r o k u . c o m / a r t i c l e s / c o n f i g - v a r s ) 
 
         *   A s   a   r e m i n d e r ,   y o u   c a n   c h e c k   f o r   t h e   e n v i r o n m e n t   v a r i a b l e   a n d   f a l l   b a c k   t o   a   l o c a l   m o n g o   s e r v e r : 
         ` ` ` 
         / /   I f   d e p l o y e d ,   u s e   t h e   d e p l o y e d   d a t a b a s e .   O t h e r w i s e   u s e   t h e   l o c a l   m o n g o H e a d l i n e s   d a t a b a s e         
         ` v a r   M O N G O D B _ U R I   =   p r o c e s s . e n v . M O N G O D B _ U R I   | |   " m o n g o d b : / / l o c a l h o s t / m o n g o H e a d l i n e s " ; ` 
         ` ` ` 
 
         *   T h e n ,   j u s t   p a s s   t h e   ` M O N G O D B _ U R I `   v a r i a b l e   t o   ` m o n g o o s e . c o n n e c t ` .   I f   y o u   d e f i n e   ` M O N G O D B _ U R I `   o n   h e r o k u ,   y o u r   p r o d u c t i o n   a p p   w i l l   a u t o m a t i c a l l y   u s e   t h e   r e m o t e   d a t a b a s e 
 
         *   Y o u   s h o u l d n ' t   c o n n e c t   t o   t h e   r e m o t e   d a t a b a s e   w h e n   d e v e l o p i n g   l o c a l l y .   Y o u r   c l a s s r o o m ' s   n e t w o r k   m a y 
         n o t   f u n c t i o n   i f   y o u   d o   ( b u t   i t ' s   a l s o   b e s t   p r a c t i c e   t o   u s e   a   l o c a l   d a t a b s e   f o r   d e v e l o p m e n t ) . 
 
 1 5 .   [ W a t c h   t h i s   d e m o   o f   a   p o s s i b l e   s u b m i s s i o n ] ( m o n g o - h o m e w o r k - d e m o . m o v ) .   S e e   t h e   d e p l o y e d   d e m o   a p p l i c a t i o n   [ h e r e ] ( h t t p : / / n y t - m o n g o - s c r a p e r . h e r o k u a p p . c o m / ) . 
 
 1 6 .   Y o u r   s i t e   d o e s n ' t   n e e d   t o   m a t c h   t h e   d e m o ' s   s t y l e ,   b u t   f e e l   f r e e   t o   a t t e m p t   s o m e t h i n g   s i m i l a r   i f   y o u ' d   l i k e .   O t h e r w i s e ,   j u s t   b e   c r e a t i v e ! 
 
 # #   I n s t r u c t i o n s 
 
 *   C r e a t e   a n   a p p   t h a t   a c c o m p l i s h e s   t h e   f o l l o w i n g : 
 
     1 .   W h e n e v e r   a   u s e r   v i s i t s   y o u r   s i t e ,   t h e   a p p   s h o u l d   s c r a p e   s t o r i e s   f r o m   a   n e w s   o u t l e t   o f   y o u r   c h o i c e   a n d   d i s p l a y   t h e m   f o r   t h e   u s e r .   E a c h   s c r a p e d   a r t i c l e   s h o u l d   b e   s a v e d   t o   y o u r   a p p l i c a t i o n   d a t a b a s e .   A t   a   m i n i m u m ,   t h e   a p p   s h o u l d   s c r a p e   a n d   d i s p l a y   t h e   f o l l o w i n g   i n f o r m a t i o n   f o r   e a c h   a r t i c l e : 
 
           *   H e a d l i n e   -   t h e   t i t l e   o f   t h e   a r t i c l e 
 
           *   S u m m a r y   -   a   s h o r t   s u m m a r y   o f   t h e   a r t i c l e 
 
           *   U R L   -   t h e   u r l   t o   t h e   o r i g i n a l   a r t i c l e 
 
           *   F e e l   f r e e   t o   a d d   m o r e   c o n t e n t   t o   y o u r   d a t a b a s e   ( p h o t o s ,   b y l i n e s ,   a n d   s o   o n ) . 
 
     2 .   U s e r s   s h o u l d   a l s o   b e   a b l e   t o   l e a v e   c o m m e n t s   o n   t h e   a r t i c l e s   d i s p l a y e d   a n d   r e v i s i t   t h e m   l a t e r .   T h e   c o m m e n t s   s h o u l d   b e   s a v e d   t o   t h e   d a t a b a s e   a s   w e l l   a n d   a s s o c i a t e d   w i t h   t h e i r   a r t i c l e s .   U s e r s   s h o u l d   a l s o   b e   a b l e   t o   d e l e t e   c o m m e n t s   l e f t   o n   a r t i c l e s .   A l l   s t o r e d   c o m m e n t s   s h o u l d   b e   v i s i b l e   t o   e v e r y   u s e r . 
 
 *   B e y o n d   t h e s e   r e q u i r e m e n t s ,   b e   c r e a t i v e   a n d   h a v e   f u n   w i t h   t h i s ! 
 
 # # #   T i p s 
 
 *   G o   b a c k   t o   S a t u r d a y ' s   a c t i v i t i e s   i f   y o u   n e e d   a   r e f r e s h e r   o n   h o w   t o   p a r t n e r   o n e   m o d e l   w i t h   a n o t h e r . 
 
 *   W h e n e v e r   y o u   s c r a p e   a   s i t e   f o r   s t o r i e s ,   m a k e   s u r e   a n   a r t i c l e   i s n ' t   a l r e a d y   r e p r e s e n t e d   i n   y o u r   d a t a b a s e   b e f o r e   s a v i n g   i t ;   w e   d o n ' t   w a n t   d u p l i c a t e s . 
 
 *   D o n ' t   j u s t   c l e a r   o u t   y o u r   d a t a b a s e   a n d   p o p u l a t e   i t   w i t h   s c r a p e d   a r t i c l e s   w h e n e v e r   a   u s e r   a c c e s s e s   y o u r   s i t e . 
 
     *   I f   y o u r   a p p   d e l e t e s   s t o r i e s   e v e r y   t i m e   s o m e o n e   v i s i t s ,   y o u r   u s e r s   w o n ' t   b e   a b l e   t o   s e e   a n y   c o m m e n t s   e x c e p t   t h e   o n e s   t h a t   t h e y   p o s t . 
 
 
 
 # # #   H e l p f u l   L i n k s 
 
 *   [ M o n g o D B   D o c u m e n t a t i o n ] ( h t t p s : / / d o c s . m o n g o d b . c o m / m a n u a l / ) 
 *   [ M o n g o o s e   D o c u m e n t a t i o n ] ( h t t p : / / m o n g o o s e j s . c o m / d o c s / a p i . h t m l ) 
 *   [ C h e e r i o   D o c u m e n t a t i o n ] ( h t t p s : / / g i t h u b . c o m / c h e e r i o j s / c h e e r i o ) 
 
 
 -   -   - 
 
 # # #   H o s t i n g   o n   H e r o k u 
 
 N o w   t h a t   w e   h a v e   a   b a c k e n d   t o   o u r   a p p l i c a t i o n s ,   w e   u s e   H e r o k u   f o r   h o s t i n g .   P l e a s e   n o t e   t h a t   w h i l e   * * H e r o k u   i s   f r e e * * ,   i t   w i l l   r e q u e s t   c r e d i t   c a r d   i n f o r m a t i o n   i f   y o u   h a v e   m o r e   t h a n   5   a p p l i c a t i o n s   a t   a   t i m e   o r   a r e   a d d i n g   a   d a t a b a s e . 
 
 
 # # #   O n e   L a s t   T h i n g 
 
 I f   y o u   h a v e   a n y   q u e s t i o n s   a b o u t   t h i s   p r o j e c t   o r   t h e   m a t e r i a l   w e   h a v e   c o v e r e d ,   . . .   T h a t   g o e s   t h r e e f o l d   f o r   t h i s   w e e k :   M o n g o D B   a n d   M o n g o o s e   c o m p o s e   a   c h a l l e n g i n g   d a t a   m a n a g e m e n t   s y s t e m .   I f   t h e r e ' s   a n y t h i n g   y o u   f i n d   c o n f u s i n g   a b o u t   t h e s e   t e c h n o l o g i e s ,   d o n ' t   h e s i t a t e   t o   s p e a k   w i t h   s o m e o n e   f r o m   t h e   B o o t c a m p   t e a m . 
 
 * * G o o d   L u c k ! * * 
 
 -   -   - 
 
 # # #   B e h i n d   t h e   S c e n e s   o f   V o x S c r a p e : 
 
 # # # #   F i l e   S t r u c t u r e 
 
 ` ` ` 
 . 
%% %    c o n f i g 
%      %% %    r o u t e s . j s 
% 
%% %    c o n t r o l l e r s 
%      %% %    h e a d l i n e s . j s 
%      %% %    n o t e s . j s       
%             
%% %    m o d e l s 
%      %% %    A r t i c l e . j s 
%      %% %    H e a d l i n e . j s       
%      %% %    i n d e x . j s 
%      %% %    N o t e . j s   
% 
%% %    n o d e _ m o d u l e s 
%      %% %    ( m u l t i p l e   m o d u l e   d i r e c t o r i e s ) 
% 
%% %    p a c k a g e - l o c k . j s o n 
%   
%% %    p a c k a g e . j s o n 
%         
%% %    p u b l i c   
%      %       
%      %% %    a p p . j s 
%      % 
%      %% %    a s s e t s 
%      %      %% %    c s s 
%      %      %        %% %    r e s e t . c s s 
%      %      %        %% %    s t y l e . c s s 
%      %      % 
%      %      %% %    i m a g e s 
%      %      %        %% %    ( m u l t i p l e   i m a g e s   u s e d   i n   h o m e   a n d   s u r v e y   p a g e s )     
%      %      % 
%      %      %% %    j a v a s c r i p t 
%      %                %% %    b o o t b o x . m i n . j s       
%      %                %% %    i n d e x . j s 
%      %                %% %    s a v e d . j s   
%      % 
%      %% %    i n d e x . h t m l 
% 
%% %    s c r e e n s h o t s 
%      %% %    ( m u l t i p l e   i m a g e s   u s e d   i n   t h i s   R E A D M E ) 
%             
%% %    s c r i p t s 
%      %% %    d a t e . j s 
%      %% %    s c r a p e . j s   
% 
%% %    s e r v e r . j s 
%             
%% %    v i e w s 
            %% %    h o m e . h a n d l e b a r s 
            %       
            %% %    l a y o u t s   
            %          %% %    m a i n . h a n d l e b a r s   
            %          %% %    p a r t i a l s 
            %                          %% %    n o t e s - m o d a l . h a n d l e b a r s 
            %     
            %% %    s a v e d . h a n d l e b a r s   
 
 ` ` ` 
 
 # # # #   F i l e   a n d   d i r e c t o r y   f u n c t i o n a l i t y   o f   n o t e : 
 
 *   R e q u i r e d   n p m   p a c k a g e s ,   * * e x p r e s s * * ,   * * b o d y - p a r s e r * * ,   a n d   * * p a t h * *   a r e   c a l l e d   b y   * ` s e r v e r . j s ` * . 
 
 
 *   T h e   * * ` h t m l R o u t e s . j s ` * *   f i l e   c o n t a i n s   t h e   f o l l o w i n g   r o u t e s : 
 
 -   -   - 
 
 # # #   I n   c a s e   y o u ' r e   i n t e r e s t e d . . . 
 
 A g a i n ,   y o u   c a n   i n t e r a c t   w i t h   t h i s   a p p l i c a t i o n   i n   r e a l - t i m e   a t   t h e   f o l l o w i n g   a d d r e s s : < b r   / > [ h t t p s : / / b o n n i e h o - v o x - c o m - s c r a p e r . h e r o k u a p p . c o m / ] ( h t t p s : / / b o n n i e h o - v o x - c o m - s c r a p e r . h e r o k u a p p . c o m / ) ,   h o w e v e r ,   i f   y o u ' d   p r e f e r   t o   t a k e   i t   f o r   a   t e s t   d r i v e   o n   y o u r   l o c a l   m a c h i n e ,   k e e p   r e a d i n g . 
 
 
 # # # #   L o c a l   E n v i r o n m e n t   S e t u p 
 
 T o   u s e   t h i s   v e r s i o n   o f   " V o x S c r a p e "   f r o m   y o u r   o w n   l o c a l   e n v i r o n m e n t ,   h e r e ' s   w h a t   y o u ' v e   g o t   t o   d o : 
 
 * * S t e p   1   -   C l o n e   t h i s   r e p o   i n   t h e   c o m m a n d   l i n e   b e l o w   u s i n g   t h e   f o l l o w i n g   t e x t : * * 
 ` ` ` 
 g i t   c l o n e   h t t p s : / / g i t h u b . c o m / b o n n i e h o / V o x S c r a p e . g i t 
 ` ` ` 
 * * S t e p   2   -   I n   y o u   l o c a l   d i r e c t o r y   s t r u c t u r e ,   n a v i g a t e   i n t o   t h e   n e w l y   c l o n e d   r e p o   d i r e c t o r y : * * 
 ` ` ` 
 c d   V o x S c r a p e 
 ` ` ` 
 * * S t e p   3   -   I n s t a l l   t h e   r e q u i r e d   N P M   p a c k a g e s   u s i n g   t h e   f o l l o w i n g   c o m m a n d : * * 
 ` ` ` 
 n p m   i n s t a l l 
 ` ` ` 
 * * S t e p   4   -   S t a r t   t h e   a p p l i c a t i o n   s e r v e r   u s i n g   t h e   f o l l o w i n g   c o m m a n d : * * 
 ` ` ` 
 n o d e   s e r v e r . j s 
 ` ` ` 
 * * S t e p   5   -   N o w ,   o p e n   t h e   l o c a l   a p p l i c a t i o n   o n   p o r t   3 0 0 0   a t   t h e   U R L : * * 
 ` ` ` 
   h t t p : / / l o c a l h o s t : 3 0 0 0 / 
 ` ` ` 
 
 -   -   - 
 
 # # # #   A u t h o r ' s   n o t e : 
 
 T h i s   w a s   o n e   t h e   t h e   e x e r c i s e s   o r i g i n a l l y   a s s i g n e d   a n d   c o m p l e t e d   i n   m y   f u l l - s t a c k   c o d i n g   b o o t c a m p .   A l t h o u g h   t h e   f u n c t i o n a l i t y   o f   t h i s   a p p   w a s   s u c c e s s f u l l y   i n   p l a c e   a t   t h e   t i m e   o f   t h e   a s s i g n m e n t ' s   s u b m i s s i o n ,   c o n s i d e r i n g   t h e   l i m i t e d   a m o u n t   o f   t i m e   t h a t   w a s   a v a i l a b l e   t o   e a c h   t o p i c   i n   t h i s   c o u r s e ,   i t   h a d   a l w a y s   b e e n   m y   i n t e n t i o n   t o   r e - v i s i t   t h i s   o f f e r i n g   t o   g i v e   i t   t h e   s p i t - a n d - p o l i s h   I   f e l t   i t   w a s   w o r t h y   o f .   
 
 -   -   -   
 
 
 ( c ) 2 0 1 7 - 2 0 1 9   _ _ B o n n i e   L y n n e   H o f f m a n _ _   
 
 * t o w a r d   t h e   c o m p l e t i o n   o f   T h e   U n i v e r s i t y   o f   T e x a s   a t   A u s t i n   H o u s t o n   C o d i n g   B o o t   C a m p   C e r t i f i c a t e   -   ( J u n e   2 0 1 7   c o h o r t ) * 
 
